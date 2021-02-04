import React from 'react';
import { Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'

export function SignOut() {
    const cookies = new Cookies();

    function handleSignOut() {
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
    return (
        <main>
            <Grid container direction="row-reverse" >
                <Button variant="outlined"
                    onClick={handleSignOut}
                    color="secondary">Sign Out
                    </Button>
            </Grid>
            <div className="nav-bar">
                <a class="logout-btn" href="">
                    <img src="" ></img>
                    <div className="logout-txt">LOGOUT</div>
                </a>
            </div>
        </main>
    )

}

export default SignOut;