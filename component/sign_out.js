/** The Sign Out component to display the Back button, Cart icon and Sign Out button */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2'
import Cart from './cart'
import Back from './back'

export function SignOut() {
    const cookies = new Cookies();

    // Function to handle when a user click Sign Out button
    function handleSignOut() {
        // Remove the cookies
        cookies.remove('currentID');
        cookies.remove('studentName');
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
            <Grid container direction="row-reverse" justify="space-between" >
                <Grid item>
                    <div className="nav-bar">
                        <Cart />
                        <a className="logout-btn" onClick={handleSignOut} href="/">
                            <img className="logout-img" src="/img/logout.png" />
                            <div className="logout-txt">LOGOUT</div>
                        </a>
                    </div>
                </Grid>

                <Grid item>
                    <Back />
                </Grid>
            </Grid>

        </main>
    )

}

export default SignOut;