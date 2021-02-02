import Swal from 'sweetalert2';

export default function Alert(props) {
    return (
        Swal.fire({
            icon: 'error',
            title: 'Not Found',
            text: 'Component does not exist!',
            footer: 'Please try again!',
            timer: '2000',
            timerProgressBar: true
        })
    );
}