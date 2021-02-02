
import React, { Fragment } from 'react';
import Head from 'next/head';

const Layout = props => (
    <Fragment>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>{props.pageTitle || 'Component Store'}</title>
        </Head>
        {props.children}
    </Fragment>
);

export default Layout;