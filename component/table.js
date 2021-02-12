import React from 'react';
import Typography from '@material-ui/core/Typography';

import Cookies from 'universal-cookie';

import Popup from './component_popup'


export default function Table(props) {


    // Array to store the response's array
    const search_result = props.data;


    // Function to handle when a user click on a component
    function handleClickItem(item) {
        Popup(item);
    }

    if (props.data.length > 0) {
        return (
            <div className="container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-2">Photo</div>
                        <div className="col col-1">Name&nbsp;</div>
                        <div className="col col-3">Quantity&nbsp;</div>
                        <div className="col col-4">Part #&nbsp;</div>
                    </li>
                    {search_result.map((item) => (
                        <li className="table-row" key={item.component_name} onClick={() => { handleClickItem(item) }}>
                            <div className="col col-2">
                                <img alt="Google" height="50" width="100" id="hplogo" src="https://via.placeholder.com/100x50" />
                            </div>
                            <div className="col col-1">{item.component_name}</div>
                            <div className="col col-4"><span id="table-quantity">Quantity:</span>{item.quantity}</div>
                            <div className="col col-3">{item.part_number}</div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    } else {
        if (props.mobile) {
            return (
                props.search ? (
                    <Typography align="center" style={{ marginTop: "15px" }}> Component not founded </Typography>) : null

            )
        } else {
            return (<div></div>)

        }
    }


}
