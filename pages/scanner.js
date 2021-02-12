import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { getRequest } from '../lib/script';
import { Container } from '@material-ui/core';
import Cookies from 'universal-cookie';
import Loading from '../component/Loading';
import Popup from '../component/component_popup';
import Alert from '../component/alert';
import SignOut from '../component/sign_out';

const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const ByPass = dynamic(() => import('../component/bypass'), { ssr: false });
const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

export default function Scanner() {
    // Cookies and router
    const cookies = new Cookies();
    const [loading, setLoading] = useState(false);

    const handleScan = (data) => {
        if (data) {
            // Handle loading when a qr is scanned
            setLoading(true);
            console.log(data);
            getRequest(data, "id", (result, status) => {
                setLoading(false);
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
    if (cookies.get('currentID')) {
        return (
            <main>
                <div className="scanner-page" >
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
                                delay={1000}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%' }}
                            />
                            <p>SCAN ME</p>
                        </div>
                        {loading ? (
                            <>
                                <Loading load={loading} />
                            </>
                        ) : <></>}
                    </Container>

                </div>
            </main>
        );
    } else {
        return (
            <div>
                <ByPass message="Log in Please." />
            </div>
        )
    }
}