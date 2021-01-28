import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom'
import { useRouter } from 'next/router'

export default function Options() {

    const cookies = new Cookies();
    const router = useRouter();

    useEffect(() => {
        if (!cookies.get('currentID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    })

    function handleSignOut() {
        cookies.remove('currentID');
        router.push('/');
    }

    if (cookies.get('currentID')) {
        return (
            <div>
                <Grid container direction="column" alignItems="center" justify="center">
                    <h1>Hello world. + {cookies.get('currentID')}</h1>
                    <Button variant="outlined"
                        onClick={handleSignOut}
                        color="secondary">Sign Out</Button>
                </Grid>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Nice try.</h1>
            </div>
        );
    }

}