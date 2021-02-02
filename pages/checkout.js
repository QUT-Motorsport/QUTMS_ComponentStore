import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import CartItem from '../component/cartitem'
import Review from '../component/review'

const SignOut = dynamic(() => import('../component/sign_out'), { ssr: false });
const Item = dynamic(() => import('../component/item'), { ssr: false });
const ByPass = dynamic(() => import('../component/bypass'), { ssr: false });

const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });
const FormControl = dynamic(() => import('@material-ui/core/FormControl'), { ssr: false });
const Typography = dynamic(() => import('@material-ui/core/Typography'), { ssr: false })
const Paper = dynamic(() => import('@material-ui/core/Paper'), { ssr: false })


export default function CheckOut() {
    const cookies = new Cookies();
    const router = useRouter();
    var studentID = '';
    var result = [];


    useEffect(() => {
        if (!cookies.get('currentID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    }, [])


    if (cookies.get('currentID')) {
        studentID = cookies.get('currentID');
        return (
            <div>
                <Container maxWidth="sm">
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center" alignContent="center">
                        <SignOut />

                        <Typography variant="h6" gutterBottom>
                            Order summary for {studentID}
                        </Typography>
                    </Grid>

                    <Container>
                        <Review />
                    </Container>
                </Container>

                {/* <Item data={result} mobile={true} search={text} /> */}
            </div>

        )
    } else {
        return (
            <div>
                <ByPass message="Log in Please." />
            </div>
        )
    }
}