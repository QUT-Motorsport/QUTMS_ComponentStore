import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import Layout from '../component/Layout';
import dynamic from 'next/dynamic';
import SignOut from '../component/sign_out';

const ByPass = dynamic(() => import('../component/bypass'), { ssr: false })
const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Card = dynamic(() => import('@material-ui/core/Card'), { ssr: false });
const Typography = dynamic(() => import('@material-ui/core/Typography'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });
const CropFreeIcon = dynamic(() => import('@material-ui/icons/CropFree'), { ssr: false });
const SearchIcon = dynamic(() => import('@material-ui/icons/Search'), { ssr: false });


export default function Options() {

    const cookies = new Cookies();
    const router = useRouter();

    useEffect(() => {
        if (!cookies.get('currentID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    }, [])

    function handleSignOut() {
        cookies.remove('currentID');
        router.push('/');
    }

    function handleSearchText() {
        router.push('/search_text')
    }

    function handleScanner() {
        router.push('/scanner')
    }
    if (cookies.get('currentID')) {
        return (
            // <Layout pageTitle="Component Store" children="options" >
                <Container className="border-2 border-indigo-600 min-h-full" maxWidth="sm" >
                    <SignOut/>

                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item xs={6}>
                            <Card onClick={handleSearchText}>
                                <Typography align="center">
                                    <SearchIcon />
                                    <h3>Search By Text</h3>
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card onClick={handleScanner}>
                                <Typography align="center">
                                    <CropFreeIcon />
                                    <h3>QR Scan</h3>
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
                // </Layout>
        );
    } else {
        return (
            <ByPass message="Nice Try." />
        );
    }

}