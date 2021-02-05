import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import { getRequest } from '../lib/script'
import dynamic from 'next/dynamic'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import Table from '../component/table'

const SignOut = dynamic(() => import('../component/sign_out'), { ssr: false });
const Item = dynamic(() => import('../component/item'), { ssr: false });
const ByPass = dynamic(() => import('../component/bypass'), { ssr: false });

const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });
const Divider = dynamic(() => import('@material-ui/core/Divider'), { ssr: false })

export default function Search() {
    // Cookies and router
    const cookies = new Cookies();
    const router = useRouter();

    // Hooks for result of the query, text of search bar, the name used for query
    const [result, setResult] = useState([]);
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    // useEffect to check for currentID, if there is none push them back to home page
    useEffect(() => {
        if (!cookies.get('currentID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    }, [])

    // Function to handle when a user hit enter on search bar
    function handleKeyDown(e, value) {
        // If the key is "Enter"
        if (e.keyCode == 13) {
            getRequest(value, 'name', (result, status) => {
                if (status === "success" && result) {
                    setResult(result);
                    setText(value);
                } else {
                    setResult([]);
                    setText(value);
                }
            });
        }
    }

    // Function to handle when a user click on Search icon
    function handleOnClick(value) {
        getRequest(value, 'name', (result, status) => {
            if (status === "success" && result) {
                setResult(result);
                setText(value);
            } else {
                setResult([]);
                setText(value);
            }
        });
    }

    // Render a page with a user is logged in
    if (cookies.get('currentID')) {
        return (
            <div>
                <Container maxWidth="sm">
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center" alignContent="center">


                        <SignOut />
                        <div id="big_img">
                            <img alt="QUT Motorsport" height="92" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp"
                                style={{ paddingTop: '109px' }}
                                width="272" />
                        </div>

                        <Grid container alignItems="center"
                            justify="center" alignContent="center" >

                            <InputBase placeholder="Search component" autoComplete="off"
                                onChange={(e) => setName(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, name)}
                                style={{ border: "2px groove gainsboro", borderRadius: "4px" }}
                            />
                            <IconButton onClick={() => handleOnClick(name)} arial-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                </Container>
                <Divider variant="middle" />
                {/* <Item data={result} mobile={true} search={text} /> */}
                <Table data={result} mobile={true} search={text} />
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