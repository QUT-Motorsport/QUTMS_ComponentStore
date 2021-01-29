import React, { useState}  from 'react';
import dynamic from 'next/dynamic';
import {getRequest} from '../lib/script';

export default function Scanner() {
    const [result, setResult] = useState(null);
    const QrReader = dynamic(() => import('react-qr-reader'), {
        ssr: false
    })
    const handleScan = (data) => {
        if (data) {
            getRequest(1, "id");
            setResult(data);
        }
    }
    const handleError = (err) => {
        console.error(err);
    }
    return (
        <div>
            <QrReader
            delay={100}
            onError={handleError}
            onScan={handleScan}
            style={{width:'50%'}}
            />
            <p>{result}</p>    
        </div>
    );
}