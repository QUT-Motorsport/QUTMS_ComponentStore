import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { getRequest } from '../lib/script';
import Popup from '../component/component_popup';
import Alert from '../component/alert';

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
        <div>
            <QrReader
                delay={1250}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '25%' }}
            />
        </div>
    );
}