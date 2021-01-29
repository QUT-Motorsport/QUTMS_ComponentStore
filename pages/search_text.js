import React, { useState, useEffect } from 'react';
import { Button, Grid, Container, Card, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import { TextField, FormControl, InputLabel } from '@material-ui/core'
import ByPass from './component/bypass';
import { getRequest } from '../lib/script'

export default function Search() {
    const cookies = new Cookies();
    const router = useRouter();

    const [comName, setcomName] = useState('');

    useEffect(() => {
        if (!cookies.get('currentID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    }, [])

    function handleKeyDown(e, value) {
        if (e.keyCode == 13) {
            getRequest(value, 'name');
        }
    }

    if (cookies.get('currentID')) {
        return (
            <div>
                <Container maxWidth="sm">
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center" alignContent="center">
                        <div id="big_img">
                            <img alt="Google" height="92" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp"
                                style={{ paddingTop: '109px' }}
                                width="272" />

                        </div>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                autoComplete="off"
                                onChange={(e) => setcomName(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, comName)}
                                style={{ width: 'auto', borderRadius: '4px' }}
                            />
                        </FormControl>
                    </Grid>
                </Container>
            </div>

        )
    } else {
        return (
            <ByPass message="Log in Please." />
        )
    }
}