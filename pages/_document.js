import Document, { Html, Head, Main, NextScript } from 'next/document'
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'

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
                <title>Component Store</title>
                <link rel="icon" type="image/png" href="img/icon.png" sizes="16x16" />
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