import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

export default function PopupOptions(titleDescription, textDescription) {
    const cookies = new Cookies();

    // Function to Sign out
    function handleSignOut() {
        cookies.remove('currentID');
        cookies.remove('studentName');
        window.location = '/';
    }

    // Function to redirect to Search page
    function handleSearchText() {
        window.location = '/search';

    }

    // Function to redirect to Scan page
    function handleScanner() {
        window.location = '/scanner';

    }
    return (
        Swal.fire({
            icon: 'success',
            title: titleDescription,
            text: textDescription,
            showCloseButton: true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Search By Name`,
            cancelButtonText: `Sign Out`,
            denyButtonText: `Scan QR Code`,
            confirmButtonColor: 'rgb(55, 102, 153)',
            cancelButtonColor: 'rgb(184, 35, 47)',
            denyButtonColor: 'rgb(201, 125, 48)',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                handleSearchText();
                Swal.fire({
                    icon: 'info',
                    title: 'Redirecting...',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.isDenied) {
                handleScanner();
                Swal.fire({
                    icon: 'info',
                    title: 'Redirecting...',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.isDismissed) {
                if (result.dismiss === "cancel") {
                    handleSignOut();
                    Swal.fire('Signed Out', '', 'info');
                }
            }
        })
    );
}