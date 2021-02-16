
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const TextField = dynamic(() => import('@material-ui/core/TextField'), { ssr: false });
const FormControl = dynamic(() => import('@material-ui/core/FormControl'), { ssr: false });
const Button = dynamic(() => import('@material-ui/core/Button'), { ssr: false });
const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });

export default function Form() {
    const [name, setName] = useState("");
    return (
        <>
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center" alignContent="center">
                <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Component Name" />
                    <TextField id="filled-basic" label="Part ID" variant="filled" />
                    <TextField id="outlined-basic" label="Retail ID" variant="outlined" />
                    <TextField id="filled-basic" label="Category" variant="filled" />
                    <TextField id="outlined-basic" label="Manufacturer" variant="outlined" />
                    <TextField id="outlined-basic" label="Size" variant="outlined" />
                    <TextField id="filled-basic" label="Type" variant="filled" />
                    <TextField id="outlined-basic" label="Current" variant="outlined" />
                    <TextField id="filled-basic" label="Voltage" variant="filled" />
                    <TextField id="outlined-basic" label="Inductance" variant="outlined" />
                    <TextField id="filled-basic" label="Capacitance" variant="filled" />
                    <TextField id="outlined-basic" label="Tolerance" variant="outlined" />
                    <TextField id="filled-basic" label="Misc" variant="filled" />
                    <TextField id="outlined-basic" label="Quantity" variant="outlined" />
                    <TextField id="outlined-basic" label="Location" variant="outlined" />
                    <Button variant="contained" color="primary">
                        Insert
                    </Button>
                </form>
            </Grid>
        </>
    );
}