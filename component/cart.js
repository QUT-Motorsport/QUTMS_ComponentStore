import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Swal from 'sweetalert2'

export default function Cart() {
    const cookies = new Cookies();
    const router = useRouter();

    const cart = cookies.get('order_details')
    const currID = cookies.get('currentID')

    const [number, setNumber] = useState((typeof cart === 'undefined') ? 0 : cart.length);

    // Function to handle onClick
    function handleClick() {
        if (currID) {
            router.push('/checkout');
            Swal.fire({
                icon: 'info',
                title: 'Redirecting...',
                showConfirmButton: false,
                timer: 1500
            })
        }
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
        <Grid item onClick={handleClick} style={{ float: "left", cursor: "pointer", margin: "20px 15px 15px 15px" }}>
            <ShoppingCartIcon fontSize="large" style={{ color: "#ee7624" }} />
            <span className='badge badge-warning' id='lblCartCount'>{number}</span>
        </Grid >


    )
}