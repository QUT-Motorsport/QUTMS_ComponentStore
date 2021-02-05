import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import { withStyles, makeStyles } from '@material-ui/core/styles'

import Popup from './component_popup'


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#424242",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({

    hover: {
        "&:hover": {
            backgroundColor: "#fafafa !important",
        }
    }

}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export function Item(props) {


    // Array to store the response's array
    const search_result = props.data;
    const classes = useStyles();

    // Function to handle when a user click on a component
    function handleClickItem(item) {
        Popup(item);
    }

    if (props.data.length > 0) {
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow hover={true}>
                            <StyledTableCell align="center">Photo</StyledTableCell>
                            <StyledTableCell align="right">Name&nbsp;</StyledTableCell>
                            <StyledTableCell align="right">Quantity</StyledTableCell>
                            <StyledTableCell align="right">Location&nbsp;</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {search_result.map((item) => (
                            <StyledTableRow hover={true} key={item.component_name} onClick={() => { handleClickItem(item) }}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    <img alt="Google" height="92" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp" />
                                </StyledTableCell>
                                <StyledTableCell align="right">{item.component_name}</StyledTableCell>
                                <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                                <StyledTableCell align="right">{item.location}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    } else {
        if (props.mobile) {
            return (
                props.search ? (
                    <Typography align="center" style={{ marginTop: "15px" }}> Component not founded </Typography>) : <div></div>

            )
        } else {
            return (<div></div>)

        }
    }


}

export default Item;