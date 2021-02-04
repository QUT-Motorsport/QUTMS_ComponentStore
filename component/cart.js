import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function Cart() {
    const cookies = new Cookies();
    const router = useRouter();

    const cart = cookies.get('order_details')

    const [number, setNumber] = useState((typeof cart === 'undefined') ? 0 : cart.length);

    // Function to handle onClick
    function handleClick() {
        router.push('/checkout');
    }


    // Function to update the cart when a user add a component
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            let id = setInterval(() => {
                savedCallback.current();
            }, delay);
            return () => clearInterval(id);
        }, [delay]);
    }

    useInterval(() => {
        setNumber((typeof cookies.get('order_details') === 'undefined') ? 0 : cookies.get('order_details').length);
    }, 100);
    return (
        <Grid item onClick={handleClick} style={{ float: "left" }}>
            <ShoppingCartIcon fontSize="large" style={{ color: "orange" }} />
            <span className='badge badge-warning' id='lblCartCount'>{number}</span>
        </Grid >


    )
}