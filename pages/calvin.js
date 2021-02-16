
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import e from 'cors';

const TextField = dynamic(() => import('@material-ui/core/TextField'), { ssr: false });
const FormControl = dynamic(() => import('@material-ui/core/FormControl'), { ssr: false });
const Button = dynamic(() => import('@material-ui/core/Button'), { ssr: false });
const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });


export default function Form() {
    const [name, setName] = useState("Component Name");
    const [category, setCategory] = useState("");
    const [partID, setPartID] = useState("");
    const [retailID, setRetailID] = useState("");
    const [category, setCategory] = useState("");


    const handleVolt = (e) => {
        setName(e.target.value);
    }

    return (
        <>
            <Container className="input-form-container" maxWidth="sm">
                <Grid container
                    spacing={2}
                    justify="center"
                    alignItems="center"
                    direction="row" >
                    <Grid item xs={20}>
                        <TextField disabled id="standard-disabled" label={name} variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="standard-basic" label="Part ID" />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField id="standard-basic" label="Retail ID" />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField id="standard-basic" label="Category" />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField id="standard-basic" label="Manufacturer" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Size" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Type" />
                    </Grid>
                    
                    <Grid item xs={2}>
                        <TextField type="number" id="standard-basic" label="Current" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Voltage" onChange={(e) => handleVolt(e)} />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Inductance" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Capacitance" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Tolerance" />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField value={1} type="number" id="standard-basic" label="Quantity" />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField id="standard-basic" label="Location" />
                    </Grid>
                    
                    <Grid item xs={5}>
                        <TextField multiline rows={4} id="outlined-multiline-static" variant="outlined" label="Misc" />
                    </Grid>

                    <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                            Insert
                    </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}