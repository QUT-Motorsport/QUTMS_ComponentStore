import React from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

export default function Popup(props) {
    const cookies = new Cookies();
    // Function to create a Component object
    function createComponent(
        component_id,
        component_name,
        part_number,
        retail_number,
        location,
        quantity,
        deposit
    ) {
        return { component_id, component_name, part_number, retail_number, location, quantity, deposit };
    }

    const contentStr =
        '<br><b>ID</b>: ' + props.component_id +
        '<br><b>Part ID</b>: ' + props.part_number +
        (props.retail_part_number.includes('n/a') ? '' : '<br><b>Retail ID</b>: ' + props.retail_part_number) +
        (props.size.includes('n/a') ? '' : '<br><b>Size</b>: ' + props.size) +
        (props.type.includes('n/a') ? '' : '<br><b>Type</b>: ' + props.type) +
        (props.volt.includes('n/a') ? '' : '<br><b>Voltage</b>: ' + props.volt) +
        (props.current.includes('n/a') ? '' : '<br><b>Current</b>: ' + props.current) +
        (props.inductance.includes('n/a') ? '' : '<br><b>Inductance</b>: ' + props.inductance) +
        (props.capacitance.includes('n/a') ? '' : '<br><b>Capacitance</b>: ' + props.capacitance) +
        (props.tolerance.includes('n/a') ? '' : '<br><b>Tolerance</b>: ' + props.tolerance) +
        (props.misc.includes('n/a') ? '' : '<br><b>Misc</b>: ' + props.misc) +
        '<br><b>Location</b>: ' + props.location +
        '<br><b>Available Quantity</b>: ' + props.quantity +
        '<br><b>Deposit item</b>: <input type="checkbox" id="return-item">' +
        '<br><b>Quantity</b>: <input type="number" pattern="\d" id="quantity" class="swal2-input" placeholder="Enter the quantity number" value=1>'

    return (
        Swal.fire({
            title: props.component_name,
            html: contentStr,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: 'Add to cart',
            confirmButtonColor: 'rgb(89, 179, 123)',
            imageUrl: 'https://media.digikey.com/photos/TDK%20Photos/PS1240P02AT.jpg',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Component Image',
            preConfirm: () => {
                return [
                    document.getElementById('quantity').value,
                    document.getElementById('return-item').checked];
            }
        })
            .then((result) => {
                // If a user presses confirm
                if (result.isConfirmed) {
                    // If a user try to input a value smaller than 1, pop up an error and cancel the action
                    if (parseInt(result.value[0]) < 1) {
                        Swal.fire("The minimum quantity is 1", "", "error")
                    } else {
                        // Check if the input value is larger than the current quantity. If so, pop-up an error
                        if ((parseInt(result.value[0]) > props.quantity) && (!result.value[1])) {
                            Swal.fire("Insufficient quantity.", "Please change the amount", "error")
                        } else {
                            // Create new component
                            var newComponent = createComponent(
                                props.component_id,
                                props.component_name,
                                props.part_number,
                                props.retail_number,
                                props.location,
                                parseInt(result.value[0]), result.value[1]);
                            // Init an empty order
                            var order = []

                            // If the order_details isn't in cookies, push newComponent into order
                            if (!cookies.get('order_details')) {
                                // Save the current user into a cookie in case a user forgot to commit
                                cookies.set('prevID', cookies.get('currentID'));
                                cookies.set('prevName', cookies.get('studentName'));
                                order.push(newComponent);
                                // Pop-up to alert that new component is added
                                Swal.fire(
                                    'Added!',
                                    'The component has been added to your cart.',
                                    'success'
                                )
                            } else {
                                console.log(result);

                                // Get the current order from cookies
                                order = cookies.get('order_details');
                                // Variable to check if the component is already in the order
                                var check_Duplicate = false;
                                var quantity0 = false;

                                var i = 0;
                                for (let e of order) {
                                    quantity0 = false;
                                    const totalQuantity = parseInt(e.quantity) + parseInt(newComponent.quantity);
                                    if (e.component_id === newComponent.component_id) {
                                        console.log(totalQuantity);
                                        console.log('server quantity: ' + props.quantity);
                                        if (totalQuantity > props.quantity) {
                                            Swal.fire("Insufficient quantity.", "Please change the amount", "error");
                                        } else {
                                            // Increase the quantity only
                                            e.quantity += parseInt(newComponent.quantity);
                                            // Pop-up to alert that new component is added
                                            Swal.fire(
                                                'Added!',
                                                'The component has been added to your cart.',
                                                'success'
                                            )
                                        }

                                        // Check if the current state is Return or Withdraw
                                        if (e.quantity > 0) {
                                            e.deposit = true;
                                        } else if (e.quantity < 0) {
                                            e.deposit = false;
                                        } else {
                                            // If quantity is 0, remove from the order
                                            quantity0 = true;
                                        }
                                        check_Duplicate = true;

                                        break;
                                    }
                                    i++;
                                }

                                // If the current quantity is 0, remove from order
                                if (quantity0) {
                                    order.splice(i, 1);
                                } else {
                                    // If this is a new component, push into the order
                                    if (!check_Duplicate) {
                                        order.push(newComponent);
                                    }
                                }
                            }
                            // Set new order
                            cookies.set('order_details', order);
                        }
                    }

                }
            })
    );
}