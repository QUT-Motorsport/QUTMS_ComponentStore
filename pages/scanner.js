import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { getRequest } from '../lib/script';
import Layout from '../component/Layout';
import Popup from '../component/popup'
import Swal from 'sweetalert2';

const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

export default function Scanner() {
    const handleScan = (data) => {
        if (data) {
            getRequest(data, "id", (result, status) => {
                if (status === "success" && result) {
                    console.log(result);
                    // Set result to popups 
                    Popup(result);
                } else {
                    // Send fail alert
                    setResult(result);
                }
            })
        }
    }

    const handleError = (err) => {
        console.error(err);
    }

    return (
        <Layout pageTitle="Component Store" children="scanner" >
        <div>
            <QrReader
                delay={1500}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '25%' }} 
            />
        </div>
        </Layout>
    );
}