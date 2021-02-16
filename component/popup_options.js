/** The "Pop-up options" is used for   */
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

// This is a component for popup showing search and scan options which would redirect the chosen page if pressed
export default function PopupOptions(titleDescription, textDescription) {
    const cookies = new Cookies();

    // Function to Sign out
    function handleSignOut() {
        // Remove session related cookies
        cookies.remove('currentID');
        cookies.remove('studentName');
        // Redirect user to login page
        window.location = '/';
    }

    // Function to redirect to Search page
    function handleSearchText() {
        // Redirect user to search page
        window.location = '/search';

    }

    // Function to redirect to Scan page
    function handleScanner() {
        // Redirect user to scanner page
        window.location = '/scanner';
    }
    return (
        // Render option popup
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
            // If the user click "Search By Name"
            if (result.isConfirmed) {
                handleSearchText();
                // Trigger popup
                Swal.fire({
                    icon: 'info',
                    title: 'Redirecting...',
                    showConfirmButton: false,
                    timer: 1500
                })
                // If the user click "Scan QR Code"

            } else if (result.isDenied) {
                handleScanner();
                // Trigger popup
                Swal.fire({
                    icon: 'info',
                    title: 'Redirecting...',
                    showConfirmButton: false,
                    timer: 1500
                })
                // If the user click "Sign Out"
            } else if (result.isDismissed) {
                // Trigger popup
                if (result.dismiss === "cancel") {
                    handleSignOut();
                    Swal.fire('Signed Out', '', 'info');
                }
            }
        })
    );
}