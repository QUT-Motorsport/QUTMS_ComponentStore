import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { getRequest } from '../lib/script';
import Popup from '../component/component_popup';
import Alert from '../component/alert';
import SignOut from '../component/sign_out';
import Cart from '../component/cart';
import { Container } from '@material-ui/core';

const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });

const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

export default function Scanner() {
    const handleScan = (data) => {
        if (data) {
            getRequest(data, "id", (result, status) => {
                if (status === "success" && result) {
                    // Set result to popups 
                    Popup(result);
                } else if (status === "fail") {
                    // Send fail alert
                    Alert();
                    console.log("Component not found!");
                }
            })
        }
    }

    const handleError = (err) => {
        console.error(err);
    }

    return (
        <main>
            <div className="nav">
                <SignOut />
            </div>
            <Container className="container" maxWidth="sm">
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center" alignContent="center">

                </Grid>
                <div className="scanner-container">
                    <QrReader
                        delay={1250}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                    <p>SCAN ME</p>
                </div>
            </Container>
        </main>
    );
}