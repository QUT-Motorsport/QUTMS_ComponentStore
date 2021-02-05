import React from 'react';
import { Button, Grid, Container } from '@material-ui/core';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import Cart from './cart'
import Back from './back'

export function SignOut() {
    const cookies = new Cookies();
    const currID = cookies.get('currentID');
    function handleSignOut() {
        if (currID) {
            cookies.remove('currentID');
            Swal.fire({
                icon: 'info',
                title: 'Signed Out',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                window.location = '/';
            })
        }

    }
    return (

        <Grid container direction="row-reverse" justify="space-between">
            <Grid item={true}>
                <div>
                    <Cart />
                    <Button variant="outlined"
                        disabled={currID ? false : true}
                        onClick={handleSignOut}
                        color="secondary">Sign Out
                    </Button>

                </div>
            </Grid>

            <Grid item>
                <Back />
            </Grid>

        </Grid >



    )

}

export default SignOut;