import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Review from '../component/review'
import { update } from '../lib/script'
import Swal from 'sweetalert2';


const SignOut = dynamic(() => import('../component/sign_out'), { ssr: false });
const Item = dynamic(() => import('../component/item'), { ssr: false });
const ByPass = dynamic(() => import('../component/bypass'), { ssr: false });

const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false });
const FormControl = dynamic(() => import('@material-ui/core/FormControl'), { ssr: false });
const Typography = dynamic(() => import('@material-ui/core/Typography'), { ssr: false })
const Button = dynamic(() => import('@material-ui/core/Button'), { ssr: false })


export default function CheckOut() {
    const cookies = new Cookies();
    const router = useRouter();
    var studentID = '';
    var studentName = '';
    var result =
    {
        stu_id: cookies.get('prevID') ? cookies.get('prevID') : cookies.get('currentID'),
        stu_name: cookies.get('prevName') ? cookies.get('prevName') : cookies.get('studentName'), order_details: cookies.get('order_details')
    };

    // Function when a user click Commit button
    function handleCommit() {
        Swal.fire({
            icon: 'warning',
            title: "Are you sure you want to update the database?",
            showDenyButton: true,
            showCloseButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
        }).then((res) => {
            if (res.isConfirmed) {
                update(result, (response, status) => {
                    if (status === "fail") {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong",
                            text: "Please check your order again.",
                            showConfirmButton: false
                        })
                        console.log("Something is wrong")
                    } else if (status === "success") {
                        // Remove the cookies after finish commiting
                        cookies.remove('order_details');
                        cookies.remove('prevID');
                        cookies.remove('prevName');

                        // Pop up to let the user know the action is completed
                        Swal.fire({
                            icon: 'success',
                            title: "Database updated.",
                            text: "What would you want to do next?",
                            showCloseButton: true,
                            showDenyButton: true,
                            confirmButtonText: `Return to homepage`,
                            denyButtonText: `Sign Out`,
                        }).then((result) => {
                            window.location = "/";
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                Swal.fire({
                                    icon: 'info',
                                    title: 'Redirecting to homepage...',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            } else if (result.isDenied) {
                                cookies.remove('currentID');
                                Swal.fire('Signed Out', '', 'info');
                            }
                        })
                    }
                })
            }
        })

    }

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

                        <Typography variant="h6" gutterBottom style={{ color: "white" }}>
                            Order summary for {studentName}
                        </Typography>
                    </Grid>

                </Container>


                <Review />

                <Grid container direction="row-reverse" >
                    <Button variant="contained"
                        onClick={handleCommit}
                    >COMMIT
                    </Button>
                </Grid>

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