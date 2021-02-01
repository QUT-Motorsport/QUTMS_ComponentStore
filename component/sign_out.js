import React from 'react';
import { Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'

export function SignOut() {
    const cookies = new Cookies();
    const router = useRouter();

    function handleSignOut() {
        cookies.remove('currentID');
        router.push('/');
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