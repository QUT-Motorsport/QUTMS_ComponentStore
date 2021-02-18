
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { insert } from '../lib/script';
import Swal from 'sweetalert2';
import Loading from '../component/Loading';


const TextField = dynamic(() => import('@material-ui/core/TextField'), { ssr: false });
const Button = dynamic(() => import('@material-ui/core/Button'), { ssr: false });
const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });


export default function Form() {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [partID, setPartID] = useState("");
    const [retailID, setRetailID] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [type, setType] = useState("");
    const [size, setSize] = useState("");
    const [current, setCurrent] = useState("");
    const [inductance, setInductance] = useState("");
    const [capacitance, setCapacitance] = useState("");
    const [volt, setVolt] = useState("");
    const [tolerance, setTolerance] = useState("");
    const [quantity, setQuantity] = useState(10);
    const [location, setLocation] = useState("");
    const [misc, setMisc] = useState("");

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }
    const handlePartID = (e) => {
        setPartID(e.target.value);
    }
    const handleRetailID = (e) => {
        setRetailID(e.target.value);
    }
    const handleManufacturer = (e) => {
        setManufacturer(e.target.value);
    }
    const handleType = (e) => {
        setType(e.target.value);
    }
    const handleSize = (e) => {
        setSize(e.target.value);
    }
    const handleCurrent = (e) => {
        setCurrent(e.target.value);
    }
    const handleInductance = (e) => {
        setInductance(e.target.value);
    }
    const handleCapacitance = (e) => {
        setCapacitance(e.target.value);
    }
    const handleVolt = (e) => {
        setVolt(e.target.value);
    }
    const handleTolerance = (e) => {
        setTolerance(e.target.value);
    }
    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handleMisc = (e) => {
        setMisc(e.target.value);
    }

    const handleClick = (e) => {
        setLoading(true);
        const component = {
            name: category + " " + current + " " + volt + " " + inductance + " " + capacitance + " " + tolerance + " ",
            category: category,
            partID: partID,
            retailID: retailID,
            size: size,
            type: type,
            volt: volt,
            current: current,
            inductance: inductance,
            capacitance: capacitance,
            tolerance: tolerance,
            misc: misc,
            quantity: quantity,
            location: location,
            manufacturer: manufacturer,
        }
        Swal.fire({
            icon: 'warning',
            title: "Are you sure you want to add the component into the database?",
            showDenyButton: true,
            showCloseButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({
                    icon: 'warning',
                    title: "Are you really sure?",
                    showDenyButton: true,
                    showCloseButton: true,
                    confirmButtonText: "Yes",
                    denyButtonText: "No",
                }).then((res) => {
                    if (res.isConfirmed) {
                        Swal.fire({
                            icon: 'warning',
                            title: "There is no turning back. ARE YOU SURE?",
                            showDenyButton: true,
                            showCloseButton: true,
                            confirmButtonText: "Yes",
                            denyButtonText: "No",
                        }).then((res) => {
                            if (res.isConfirmed) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: "THIS IS THE FINAL WARNING. YOU REALLY WANT TO DO THIS CALVIN?",
                                    showDenyButton: true,
                                    showCloseButton: true,
                                    confirmButtonText: "Yes",
                                    denyButtonText: "No",
                                }).then((res) => {
                                    if (res.isConfirmed) {
                                        insert(component, (result, state) => {
                                            if (state === "success") {
                                                setLoading(false);
                                                // Clear all state
                                                setCategory("");
                                                setPartID("");
                                                setRetailID("");
                                                setSize("");
                                                setType("");
                                                setVolt("");
                                                setCurrent("");
                                                setInductance("");
                                                setCapacitance("");
                                                setTolerance("");
                                                setMisc("");
                                                setQuantity(0);
                                                setCategory("");
                                                setManufacturer("");

                                                // Popup succesful request
                                                Swal.fire(
                                                    'Inserted!',
                                                    'Please use MongoDB next time.',
                                                    'success'
                                                )
                                            } else if (state === "failed") {
                                                // Alert
                                                Swal.fire("Already exist.", "The component is already exist. Please try again", "error");
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })




    }

    return (
        <>
            <Loading load={loading} />
            <Container className="input-form-container" maxWidth="sm">
                <Grid container
                    spacing={2}
                    justify="center"
                    alignItems="center"
                    direction="row" >
                    <Grid item xs={10}>
                        <TextField multiline disabled id="standard-disabled" label={category + " " + current + " " + volt + " " + inductance + " " + capacitance + " " + tolerance + " "} variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="standard-basic" onChange={(e) => handlePartID(e)} label="Part ID" />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField id="standard-basic" onChange={(e) => handleRetailID(e)} label="Retail ID" />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField id="standard-basic" onChange={(e) => handleCategory(e)} label="Category" />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField id="standard-basic" onChange={(e) => handleManufacturer(e)} label="Manufacturer" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" onChange={(e) => handleSize(e)} label="Size" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" onChange={(e) => handleType(e)} label="Type" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" onChange={(e) => handleCurrent(e)} label="Current" />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Voltage" onChange={(e) => handleVolt(e)} />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Inductance" onChange={(e) => handleInductance(e)} />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Capacitance" onChange={(e) => handleCapacitance(e)} />
                    </Grid>

                    <Grid item xs={2}>
                        <TextField id="standard-basic" label="Tolerance" onChange={(e) => handleTolerance(e)} />
                    </Grid>

                    <Grid item xs={1}>
                        <TextField value={1} type="number" id="standard-basic" label="Quantity" onChange={(e) => handleQuantity(e)} />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField id="standard-basic" label="Location" onChange={(e) => handleLocation(e)} />
                    </Grid>

                    <Grid item xs={5}>
                        <TextField multiline rows={4} id="outlined-multiline-static" variant="outlined" label="Misc" onChange={(e) => handleMisc(e)} />
                    </Grid>

                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={(e) => handleClick(e)}>
                            Insert
                    </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}