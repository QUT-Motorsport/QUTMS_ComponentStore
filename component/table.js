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

    if (props.data.length > 0) {
        return (
            <div className="container">
                <ul className="responsive-table" key={uuidv1()}>
                    <li className="table-header">
                        <div className="col col-2">Photo</div>
                        <div className="col col-1">Name&nbsp;</div>
                        <div className="col col-3">Quantity&nbsp;</div>
                        <div className="col col-4">Location&nbsp;</div>
                    </li>
                    {search_result.map((item) => (
                        <li className="table-row" key={uuidv1()} onClick={() => { handleClickItem(item) }}>
                            <div className="col col-2">
                                <img alt="Google" height="50" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp" />
                            </div>
                            <div className="col col-1">{item.component_name}</div>
                            <div className="col col-4"><span id="table-quantity">Quantity:</span>{item.quantity}</div>
                            <div className="col col-3">{item.location}</div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    } else {
        if (props.mobile) {
            return (
                props.search ? (
                    <Typography align="center" style={{ marginTop: "15px", color: "white" }}> Component not found </Typography>) : null

            )
        } else {
            return (<div></div>)

        }
    }


}
