import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PopupOptions from '../component/popup_options'

export default function Cart() {
    const cookies = new Cookies();
    const router = useRouter();

    const cart = cookies.get('order_details')

    const [number, setNumber] = useState((typeof cart === 'undefined') ? 0 : cart.length);

    // Function to handle onClick
    function handleClick() {
        var titleDescription = "What do you want to do?";
        var textDescription = "";
        PopupOptions(titleDescription, textDescription);
    }

    return (
        <Grid item onClick={handleClick}>
            <ArrowBackIcon fontSize="large" />
        </Grid >


    )
}