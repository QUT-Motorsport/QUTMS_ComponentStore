import React from 'react';
import Swal from 'sweetalert2';

export default function Popup(props) {
    return (
        Swal.fire({
            title: props.component_name,
            html: 'ID: ' + props.component_id + 
                '<br>Quantity: ' + props.quantity +
                '<br>Brand: ' + props.brand + 
                '<br>Location: ' + props.location,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Add to cart',
            cancelButtonText: 'Checkout',
            imageUrl: 'https://www.diyelectronics.co.za/store/10512-thickbox_default/resistor-220-ohm-14w-5.jpg',
            imageWidth: 300,
            imageHeight: 400,
            imageAlt: 'Component Image',
        })
    );
}