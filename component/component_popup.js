import React from 'react';
import Swal from 'sweetalert2';

export default function Popup(props) {
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
                Swal.fire(
                    'Added!',
                    'The component has been added to your cart.',
                    'success'
                )    
            } else if (result.isDenied) {
                window.location = "/";
            } 
        })
    );
}