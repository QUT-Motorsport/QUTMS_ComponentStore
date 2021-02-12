import React from 'react';
import { Grid } from '@material-ui/core';

export function ByPass(props) {

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <h2 className="text-center text-accent-1 mb-16" style={{ color: "white", marginTop: "50%" }}>{props.message}</h2>
            </Grid>
        </div>
    )
}

export default ByPass;