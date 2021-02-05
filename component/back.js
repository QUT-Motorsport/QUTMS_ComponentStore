import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
            <ArrowBackIcon fontSize="large" style={{ cursor: "pointer" }} />
        </Grid >


    )
}