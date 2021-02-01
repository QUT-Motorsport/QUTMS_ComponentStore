import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie'
import dynamic from 'next/dynamic'

const SignOut = dynamic(() => import('../component/sign_out'), { ssr: false })
const ByPass = dynamic(() => import('../component/bypass'), { ssr: false })
const LayOut = dynamic(() => import('../component/layout'), { ssr: false })

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
        if (typeof window !== undefined) {
            if (!cookies.get('currentID')) {
                setTimeout(() => {
                    console.log("Bye");
                    router.push('/')
                }, 2000)
            }
        }

    }, [])


    function handleSearchText() {
        router.push('/search')
    }

    function handleScanner() {
        router.push('/scanner')
    }
    if (cookies.get('currentID')) {
        return (
            <Container maxWidth="sm" fixed>

                <Container className="border-2 border-indigo-600 min-h-full" maxWidth="sm" >
                    <SignOut />
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Grid item xs={6}>
                            <Card onClick={handleSearchText}>
                                <Typography align="center" variant="h5">
                                    <SearchIcon />Search By Text</Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Card onClick={handleScanner}>
                                <Typography align="center" variant="h5">
                                    <CropFreeIcon />QR Scan</Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        );
    } else {
        return (
            <ByPass message="Nice Try." />
        );
    }

}