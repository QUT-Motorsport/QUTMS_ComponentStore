/** The Back component display the Back-arrow and allow user to change between Search by Text/ Scanning */
import React from 'react';
import Cookies from 'universal-cookie';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';

import PopupOptions from '../component/popup_options'

export default function Cart() {
    const cookies = new Cookies();
    const currID = cookies.get('currentID');

    // Function to handle onClick
    function handleClick() {
        if (currID) {
            var titleDescription = "What do you want to do?";
            var textDescription = "";
            PopupOptions(titleDescription, textDescription);
        }
    }

    return (
        <Grid item onClick={handleClick}>
            <ArrowBackIcon fontSize="large" style={{ cursor: "pointer", margin: "20px 15px 15px 15px", color: "white" }} />
        </Grid >


    )
}