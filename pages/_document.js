import Document, { Html, Head, Main, NextScript } from 'next/document'
import React, { useState, useEffect } from 'react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }


    render() {
        return (
            <Html>
                <Head />
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossOrigin="anonymous"></script>

                <body>
                    <Main />
                    <NextScript />
                    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossOrigin="anonymous"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument