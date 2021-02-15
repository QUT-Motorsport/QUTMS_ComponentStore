/** The Table component is used to display the components (result of the search as well as in the check out) */
import React from 'react';
import Typography from '@material-ui/core/Typography';

import Cookies from 'universal-cookie';
import Popup from './component_popup'
const { v1: uuidv1 } = require('uuid');

export default function Table(props) {

    // Array to store the response's array
    const search_result = props.data;


    // Function to handle when a user click on a component
    function handleClickItem(item) {
        Popup(item);
    }

    // Render a table if there is something in the data
    if (props.data.length > 0) {
        return (
            <div className="container">
                <ul className="responsive-table" key={uuidv1()}>
                    <li className="table-header">
                        <div className="col col-2">Photo</div>
                        <div className="col col-1">Name&nbsp;</div>
                        <div className="col col-3">Quantity&nbsp;</div>
                        <div className="col col-4">Part #&nbsp;</div>
                    </li>
                    {search_result.map((item) => (
                        <li className="table-row" key={uuidv1()} onClick={() => { handleClickItem(item) }}>
                            <div className="col col-2">
                                <img alt="Google" height="50" width="100" id="hplogo" src="https://via.placeholder.com/100x50" />
                            </div>
                            <div className="col col-1">{item.component_name}</div>
                            <div className="col col-4"><span id="table-quantity">Quantity:</span>{item.quantity}</div>
                            <div className="col col-4">{item.part_number}</div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    } else {
        return (
            props.search ? (
                <Typography align="center" style={{ marginTop: "15px", color: "white" }}> Component not found </Typography>) : null

        )
    }
}
