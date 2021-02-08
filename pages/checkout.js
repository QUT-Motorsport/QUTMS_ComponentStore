import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Review from '../component/review'
import Swal from 'sweetalert2';


const SignOut = dynamic(() => import('../component/sign_out'), { ssr: false });
const ByPass = dynamic(() => import('../component/bypass'), { ssr: false });

const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });
const Typography = dynamic(() => import('@material-ui/core/Typography'), { ssr: false });
const MenuItem = dynamic(() => import('@material-ui/core/MenuItem'), { ssr: false });
const Select = dynamic(() => import('@material-ui/core/Select'), { ssr: false });

export default function CheckOut() {
    const cookies = new Cookies();
    const router = useRouter();
    var studentName = '';

    useEffect(() => {
        if (!cookies.get('currentID') && !cookies.get('prevID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    }, [])


    if (cookies.get('currentID') || cookies.get('prevID')) {
        studentName = cookies.get('prevName') ? cookies.get('prevName') : cookies.get('currentName');
        return (
            <div>
                <SignOut />
                <Container maxWidth="sm">
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center" alignContent="center">

                        <Typography variant="h6" gutterBottom style={{ color: "white", fontFamily: "'Dosis', sans-serif" }}>
                            Order summary for <span style={{ color: "orange", fontFamily: "'Dosis', sans-serif", fontWeight: "bold" }}>{studentName}</span>
                        </Typography>
                    </Grid>
                </Container>

                <Review />
            </div >

        )
    } else {
        return (
            <div>
                <ByPass message="Log in Please." />
            </div>
        )
    }
}