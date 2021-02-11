import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import dynamic from 'next/dynamic'
import Swal from 'sweetalert2';
import { update } from '../lib/script'

const Typography = dynamic(() => import('@material-ui/core/Typography'), { ssr: false })
const Container = dynamic(() => import('@material-ui/core/Container'), { ssr: false })
const Grid = dynamic(() => import('@material-ui/core/Grid'), { ssr: false });
const Button = dynamic(() => import('@material-ui/core/Button'), { ssr: false })

function Review(props) {
    const cookies = new Cookies();
    const [num, setNum] = useState(cookies.get('order_details'));
    var carts = num;

    // Function to update the order_details when a user update a component
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            let id = setInterval(() => {
                savedCallback.current();
            }, delay);
            return () => clearInterval(id);
        }, [delay]);
    }

    // Update the summary every 1 milisecond
    useInterval(() => {
        setNum(cookies.get('order_details'));
    }, 100);

    // Function when a user click Commit button
    function handleCommit() {
        // Create an order to send to database
        const order = {
            stu_id: props.finalID,
            stu_name: props.finalName, order_details: cookies.get('order_details')
        }

        console.log(order);
        // Fire an alert to confirm the commit
        Swal.fire({
            icon: 'warning',
            title: "Are you sure you want to update the database?",
            showDenyButton: true,
            showCloseButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
        }).then((res) => {
            // If the user clicked Confirm
            if (res.isConfirmed) {
                // Update to the database
                update(order, (response, status) => {
                    // If the query failed, pop up an alert to let user know
                    if (status === "fail") {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong",
                            text: "Please check your order again.",
                            showConfirmButton: false
                        })
                        console.log("Something is wrong")
                        // else remove the cookies
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

    // Function to handle when a user check/uncheck the deposit field
    function handleCheckbox(cart) {
        // Revert the check/uncheck state as well as the display number
        cart.deposit = !cart.deposit;

        // Update the component in the cookies
        var i = 0;
        for (let ele of carts) {
            if (ele.component_id === cart.component_id) {
                break;
            }
            i++;
        }
        carts.splice(i, 1, cart);
        cookies.set('order_details', carts);
    }

    // Function to handle when a user change quantity
    function handleQuantity(e, cart) {
        cart.quantity = e.target.value;
        cart.quantity = cart.deposit ? Math.abs(cart.quantity) : (-1 * Math.abs(cart.quantity));

        // Update the component in the cookies
        var i = 0;
        for (let ele of carts) {
            if (ele.component_id === cart.component_id) {
                break;
            }
            i++;
        }
        carts.splice(i, 1, cart);
        cookies.set('order_details', carts);
    }

    function checkQuantity(e, cart) {
        if (parseInt(e.target.value) < 1) {
            cart.quantity = 1;
            // Update the component in the cookies
            var i = 0;
            for (let ele of carts) {
                if (ele.component_id === cart.component_id) {
                    break;
                }
                i++;
            }
            carts.splice(i, 1, cart);
            cookies.set('order_details', carts);

            Swal.fire("The minimum quantity is 1", "", "error");

        }
    }

    if (carts) {
        return (
            <Container>
                <div className="container">
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-2">Photo</div>
                            <div className="col col-1">Name&nbsp;</div>
                            <div className="col col-3">Quantity&nbsp;</div>
                            <div className="col col-3">Location&nbsp;</div>
                            <div className="col col-4">Return&nbsp;</div>
                        </li>
                        {carts.map((cart) => (
                            <li className="table-row" key={cart.component_name}>
                                <div className="col col-2">
                                    <img alt="Google" height="50" id="hplogo" src="/img/logo_orange.png" />
                                </div>
                                <div className="col col-1">{cart.component_name}</div>

                                <div className="col col-3"
                                    style={{ marginLeft: "3em" }}
                                ><span id="table-quantity">Quantity: </span>
                                    <input placeholder="Quantity" value={Math.abs(cart.quantity)} autoComplete="off"
                                        className="quantity-field"
                                        onBlur={(e) => checkQuantity(e, cart)}
                                        onChange={(e) => handleQuantity(e, cart)}
                                        type="text" pattern="\d*"
                                    ></input>
                                </div>

                                <div className="col col-3" style={{ marginLeft: "2.5em" }}>{cart.location}</div>

                                <div className="col col-4"
                                    style={{ marginLeft: "2.5em" }}
                                ><span id="table-quantity">Deposit item: </span>
                                    <input type="checkbox" onChange={() => handleCheckbox(cart)} checked={cart.deposit} /></div>

                            </li>
                        ))}

                    </ul>
                </div>

                <Grid container direction="row-reverse" >
                    <Button variant="contained"
                        onClick={handleCommit}
                        id="commit-button"
                        style={{ marginBottom: "5%" }}
                    >COMMIT
                    </Button>
                </Grid>
            </Container>
        );
    } else {
        return (
            <Typography align="center" style={{ marginTop: "15px", color: "white" }}> Your cart is empty. </Typography>
        )
    }

}

export default React.memo(Review);