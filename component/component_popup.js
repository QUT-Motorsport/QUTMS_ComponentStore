import React from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

export default function Popup(props) {
    const cookies = new Cookies();
    // Function to create a Component object
    function createComponent(component_id, component_name, quantity) {
        return { component_id, component_name, quantity };
    }

    return (
        Swal.fire({
            title: props.component_name,
            html: 'ID: ' + props.component_id +
                '<br>Available Quantity: ' + props.quantity +
                '<br>Brand: ' + props.brand +
                '<br>Location: ' + props.location,
            input: 'text',
            inputLabel: 'Quantity:',
            inputValue: 1,
            inputPlaceholder: 'Enter the quantity number',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter a number higher than 0.'
                } else if (value > 50) {
                    return 'Sorry, the max cap is 50';
                }
            },
            showCloseButton: true,
            showDenyButton: true,
            focusConfirm: false,
            confirmButtonText: 'Add to cart',
            denyButtonColor: '#609040',
            denyButtonText: 'Checkout',
            imageUrl: 'https://www.diyelectronics.co.za/store/10512-thickbox_default/resistor-220-ohm-14w-5.jpg',
            imageWidth: 300,
            imageHeight: 400,
            imageAlt: 'Component Image',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    console.log(props.quantity);
                    if (parseInt(result.value) > parseInt(props.quantity)) {
                        Swal.fire("Insufficient quantity.", "Please change the amount", "error")
                    } else {
                        var newComponent = createComponent(props.component_id, props.component_name, parseInt(result.value));

                        var order = []
                        if (!cookies.get('order_details')) {
                            order.push(newComponent);
                        } else {
                            order = cookies.get('order_details');
                            var check_Duplicate = false;
                            for (let e of order) {
                                if (e.component_id === newComponent.component_id) {
                                    e.quantity += parseInt(newComponent.quantity);
                                    check_Duplicate = true;
                                }
                            }
                            if (!check_Duplicate) {
                                order.push(newComponent);
                            }

                        }
                        cookies.set('order_details', order);

                        console.log("New order: ");
                        console.log(cookies.get('order_details'));
                        Swal.fire(
                            'Added!',
                            'The component has been added to your cart.',
                            'success'
                        )
                    }

                } else if (result.isDenied) {
                    window.location = "/checkout";
                    Swal.fire({
                        icon: 'info',
                        title: 'Redirecting to checkout...',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    );
}