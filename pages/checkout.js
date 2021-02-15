
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Review from '../component/review'
import _ from 'lodash';

const SignOut = dynamic(() => import('../component/sign_out'), { ssr: false });
const ByPass = dynamic(() => import('../component/bypass'), { ssr: false });

const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });

export default function CheckOut() {
    const cookies = new Cookies();
    const router = useRouter();
    var studentName = '';
    const [name, setName] = useState(cookies.get('studentName'));
    const [ID, setID] = useState(cookies.get('currentID'));

    // useEffect to check if there is any user logged in or not.
    useEffect(() => {
        if (!cookies.get('currentID') && !cookies.get('prevID')) {
            setTimeout(() => {
                router.push('/')
            }, 2000)
        }
    }, [])

    // Function to handle when a user click on the username 
    function clickPlaceholder() {
        // Get placeholder element
        var placeholder = document.getElementsByClassName('list__ul')[0];
        // Toggle between show and hide the list of user
        if (!placeholder.style.display || placeholder.style.display === "none") {
            placeholder.style.display = "block";
        } else {
            placeholder.style.display = "none";
        }
    }

    // Function to handle when a user select the name from the list
    function clickList(e) {

        // Get the list element
        var list = document.getElementsByClassName('list__ul')[0];
        var b = document.querySelectorAll('.list__ul li');
        // Find the current choice of the user
        var currentChoice = null;
        for (var el of b) {
            if (el.textContent === e.target.text) {
                currentChoice = el;
                break;
            }
        }

        // Insert the choice to the start
        list.insertBefore(currentChoice, b[0]);

        // Toggle between show or hide the list of user
        if (!list.style.display || list.style.display === "none") {
            list.style.display = "block";
        } else {
            list.style.display = "none";
        }


        // Set the name's state accordingly 
        if (e.target.text == cookies.get('studentName')) {
            setName(cookies.get('studentName'));
            setID(cookies.get('currentID'));
        } else {
            setName(cookies.get('prevName'));
            setID(cookies.get('prevID'));
        }
    }

    // Function to handle when a user is changed
    function onChangeSelect(e) {
        var placeholder = document.getElementsByClassName('placeholder')[0];
        placeholder.textContent = e.target.value;


    }
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

                        <div className="wrapper typo">Order summary for<div className="list"><span className="placeholder" onClick={() => clickPlaceholder()}
                            onChange={(e) => onChangeSelect(e)}
                        >{cookies.get('studentName')}</span>
                            <ul className="list__ul">
                                <li style={{ paddingTop: "5%" }}><a onClick={(e) => clickList(e)}>{cookies.get('studentName')}</a></li>
                                {cookies.get('prevName') !== cookies.get('studentName') && <li style={{ paddingTop: "5%" }}><a onClick={(e) => clickList(e)}>{cookies.get('prevName')}</a></li>}
                            </ul>
                        </div>
                        </div>

                    </Grid>
                </Container>
                <Review finalName={name} finalID={ID} />
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