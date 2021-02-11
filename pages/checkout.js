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

export default function CheckOut() {
    const cookies = new Cookies();
    const router = useRouter();
    var studentName = '';
    const [name, setName] = useState(cookies.get('studentName'));
    const [ID, setID] = useState(cookies.get('currentID'));


    useEffect(() => {
        if (!cookies.get('currentID') && !cookies.get('prevID')) {
            setTimeout(() => {
                console.log("Bye");
                router.push('/')
            }, 2000)
        }
    }, [])

    function clickPlaceholder(e) {
        var a = document.getElementsByClassName('list__ul')[0];
        if (!a.style.display || a.style.display === "none") {
            a.style.display = "block";
        } else {
            a.style.display = "none";
        }
    }

    function clickList(e) {
        var a = document.getElementsByClassName('placeholder')[0];
        a.textContent = e.target.text;
        a.style.opacity = "1";

        var list = document.getElementsByClassName('list__ul')[0];
        var b = document.querySelectorAll('.list__ul li');
        var currentChoice = null;
        for (var el of b) {
            if (el.textContent === e.target.text) {
                currentChoice = el;
                break;
            }
        }

        list.insertBefore(currentChoice, b[0]);

        if (!list.style.display || list.style.display === "none") {
            list.style.display = "block";
        } else {
            list.style.display = "none";
        }

        if (e.target.text == cookies.get('studentName')) {
            setName(cookies.get('studentName'));
            setID(cookies.get('currentID'));
        } else {
            setName(cookies.get('prevName'));
            setID(cookies.get('prevID'));
        }
    }

    function onChangeSelect(e) {
        var a = document.getElementsByClassName('placeholder')[0];
        a.textContent = e.target.value;


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

                        <div className="wrapper typo">Order summary for<div className="list"><span className="placeholder" onClick={(e) => clickPlaceholder(e)}
                            onChange={(e) => onChangeSelect(e)}
                        >{cookies.get('studentName')}</span>
                            <ul className="list__ul">
                                <li><a onClick={(e) => clickList(e)}>{cookies.get('studentName')}</a></li>
                                <li><a onClick={(e) => clickList(e)}>{cookies.get('prevName')}</a></li>
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