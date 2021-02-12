import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import FilterListIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import Checkbox from '@material-ui/core/Checkbox'
import _ from 'lodash';

const { v1: uuidv1 } = require('uuid');

export default function Filter(props) {

    const filter_options = ["Capacitance", "Current", "Inductance", "Size", "Tolerance", "Type", "Volt"];
    const data = props.data;
    const ogData = props.ogData;

    // Hooks to check if we show the drawer or not
    const [filter, setFilter] = useState(false);
    // Hook to save the values of each filter
    const [selected, setSelected] = useState({
        Capacitance: false,
        Current: false,
        Inductance: false,
        Size: false,
        Tolerance: false,
        Type: false,
        Volt: false,
    });

    // Hooks for the list of options the user can choose in Filter list
    const [filterOptions, setFilterOptions] = useState({
        Capacitance: [],
        Current: [],
        Inductance: [],
        Size: [],
        Tolerance: [],
        Type: [],
        Volt: [],
    })

    // State to store the condition to filter the data
    const [filterCondition, setFilterCondition] = useState({
        Capacitance: [],
        Current: [],
        Inductance: [],
        Size: [],
        Tolerance: [],
        Type: [],
        Volt: [],
    })
    // Hooks for check buttons
    const [checked, setChecked] = useState([0]);


    const [sort, setSort] = useState(false);

    // Function to handle when a user click Filter button
    function handleFilter(open) {
        console.log("This is reset");
        if (props.reset) {
            props.handleReset(false);
            setChecked([0]);
            setFilterCondition({
                Capacitance: [],
                Current: [],
                Inductance: [],
                Size: [],
                Tolerance: [],
                Type: [],
                Volt: [],
            });
        }
        setFilter(open);
    }

    // Function to handle when a filter's option is clicked

    function handleClick(a) {
        var text = a.toLowerCase();
        var result = [];

        data.filter(function (item) {
            var i = result.findIndex(x => (x[text] == item[text]));
            if (i <= -1) {
                result.push(item);
            }
        })
        var unique_result = _.map(result, text);
        unique_result = _.remove(unique_result, function (x) {
            return x !== "n/a"
        })
        setSelected({ ...selected, [a]: !selected[a] })
        setFilterOptions({ ...filterOptions, [a]: unique_result })
    }

    // Add a filter into filter's condition
    function AddFilterCondition(value, feature) {
        var filterCond = filterCondition[feature];

        if (_.includes(filterCond, value)) {
            filterCond = _.pull(filterCond, value)
        } else {
            filterCond.push(value);

        }
        setFilterCondition({ ...filterCondition, [feature]: filterCond });

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    // Function to handle when a user select filter 
    function handleActualFilter() {
        var tempData = _.cloneDeep(ogData);
        filter_options.map(x => {
            if (filterCondition[x].length > 0) {
                var text = x.toLowerCase();
                var intersection = [];

                console.log(filterCondition[x]);
                filterCondition[x].map(check => {
                    var storeData = tempData.filter(item => {
                        return check == item[text]
                    })
                    intersection = intersection.concat(storeData);

                });
                tempData = intersection;
            }
        })
        setFilter(false);

        props.onClickFilter(tempData);

    }
    const list = () => (
        < div
            role="presentation"
        >
            <List>
                {
                    filter_options.map((feature) => (
                        <div key={uuidv1()}>
                            <ListItem button key={feature} onClick={() => handleClick(feature)} >
                                <ListItemText primary={feature} key={feature} style={{ fontWeight: "bold !important" }} />
                                {selected[feature] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>

                            <Collapse in={selected[feature]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {filterOptions[feature].map((text1) => (
                                        <ListItem button key={text1} style={{ paddingLeft: "2em" }}
                                            onClick={() => AddFilterCondition(text1, feature)}

                                        >
                                            <Checkbox edge="start"
                                                checked={checked.indexOf(text1) !== -1}

                                            />
                                            <ListItemText primary={text1} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Collapse>
                        </div>
                    ))}
            </List>
        </div >
    );

    if (data.length > 0) {
        return (
            <Grid container
                justify="space-between"
            >
                <Grid item>
                    <Typography variant="overline" style={{ color: "white" }}>Result: {data.length}</Typography>
                </Grid>

                <Grid item style={{
                    display: 'flex',

                }}>
                    <Button size="small" style={{ color: "#ee7624", border: "1px solid #dfe1e5", borderRadius: "24px" }}
                        startIcon={<SortIcon />}

                    >
                        Sort
                </Button>

                    <Button size="small" style={{ color: "#ee7624", border: "1px solid #dfe1e5", borderRadius: "24px" }}
                        startIcon={<FilterListIcon />}
                        onClick={() => handleFilter(true)}
                    >
                        Filter
                </Button>

                </Grid>

                <Drawer anchor="right" open={sort}
                >
                </Drawer>

                <Drawer anchor="right" open={filter}
                    onClose={() => handleFilter(false)}
                >
                    {list()}
                    <Button variant="contained" color="primary" onClick={handleActualFilter}>Update</Button>
                </Drawer>



            </Grid>
        )
    } else {
        return null
    }

}