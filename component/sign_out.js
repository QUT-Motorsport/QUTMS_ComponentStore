import React from 'react';
import { Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

export function SignOut() {
    const cookies = new Cookies();
    const router = useRouter();

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
        <Grid container direction="row-reverse" >
            <Button variant="outlined"
                onClick={handleSignOut}
                color="secondary">Sign Out
                    </Button>
        </Grid>
    )

}

export default SignOut;