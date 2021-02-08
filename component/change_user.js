import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PopupOptions from '../component/popup_options'

export default function ChangeUser() {
    const cookies = new Cookies();
    const currID = cookies.get('currentID');

    // Function to handle onClick
    function handleClick() {
        console.log("Something")
    }

    return (
        <Grid item onClick={handleClick} style={{ float: "left", cursor: "pointer", marginTop: "15px" }}>
            <Button style={{ border: "1.5px solid orange", boxShadow: "3px 4px" }}>
                <AccountCircleIcon fontSize="large" style={{ cursor: "pointer", color: "white" }} />
                <Typography style={{ color: "white" }}>Change user</Typography>
            </Button>
        </Grid >


    )
}