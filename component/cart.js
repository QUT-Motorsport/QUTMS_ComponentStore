/** The Cart component is used for displaying the Cart icon and the number */
import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Grid from '@material-ui/core/Grid';

export default function Cart() {
    const cookies = new Cookies();
    const router = useRouter();

    const cart = cookies.get('order_details')
    const currID = cookies.get('currentID')

    // Get the number of items in the current cart
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

    // useInterval to continuously update the number
    useInterval(() => {
        setNumber((typeof cookies.get('order_details') === 'undefined') ? 0 : cookies.get('order_details').length);
    }, 100);
    if (window.location.pathname !== "/checkout") {
        return (
            <Grid item onClick={handleClick} style={{ float: "left", cursor: "pointer", margin: "20px 15px 15px 15px" }}>
                <ShoppingCartIcon fontSize="large" style={{ color: "#ee7624" }} />
                <span className='badge badge-warning' id='lblCartCount'>{number}</span>
            </Grid >
        )
    } else {
        return (null)
    }

}