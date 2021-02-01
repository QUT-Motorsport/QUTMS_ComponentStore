import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getRequest } from '../lib/script';
import Layout from '../component/Layout';
import Swal from 'sweetalert2';

const QrReader = dynamic(() => import('react-qr-reader'), {
    ssr: false
})

export default function Scanner() {
    const [result, setResult] = useState(null);
    const [alert, setAlert] = useState(null);
    

    const handleScan = (data) => {
        if (data) {
            getRequest(data, "id", (result, status) => {
                if (status === "success" && result) {
                    console.log(result);
                    setResult("Component found!");
                    handlePopup();
                } else {
                    setResult("Component not found!");
                }
            })
        }
    }

    const handleError = (err) => {
        console.error(err);
    }

    const handlePopup = () => {
        Swal.fire({
            title: 'Sweet',
            text: 'Modal with a custom image.',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            imageUrl: 'https://www.diyelectronics.co.za/store/10512-thickbox_default/resistor-220-ohm-14w-5.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
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
            <p>{result}</p>
            <p>{alert}</p>
        </div>
        </Layout>
    );
}