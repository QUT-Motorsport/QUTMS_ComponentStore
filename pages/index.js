import { getStudentID } from "../lib/api";
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import PopupOptions from '../component/popup_options';
import Swal from 'sweetalert2';
import Loading from '../component/Loading';


export default function IndexPage({ students }) {
  const [loading, setLoading] = useState(false);
  const [currentID, setCurrentID] = useState("");
  // Cookies
  const cookies = new Cookies();

  // Function to handle login and validating with a Google spreadsheet
  function handleSubmit(student_ID) {
    // Variable to check if the studentID is in the sheet or not
    var check = false;
    // trigger loading screen
    setLoading(true);
    // Validate the input ID against the IDs in the spreadsheet
    students.map((student) => {
      // Turn them into uppercase and compare
      if (student.studentID.toUpperCase() === student_ID.toUpperCase()) {
        // Set the cookies' expire time to 1 hour
        cookies.set('currentID', student_ID, {
          maxAge: 3600000
        });
        cookies.set('studentName', student.studentName, { maxAge: 3600000 });
        // Set variable check to TRUE
        check = true;

        var order_details = cookies.get('order_details');
        // If there is an order_details cookies, there is an uncommited cart
        if (typeof order_details !== "undefined" && order_details.length > 0) {
          // Alert the user
          Swal.fire({
            title: "Existing Cart!",
            text: "The previous user forgot to commit the cart. What would you like to do? ",
            icon: "warning",
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Start your new cart",
            showDenyButton: true,
            denyButtonText: "Check out old cart",
          }).then((result) => {
            // If user clicked "Start your new cart"
            if (result.isConfirmed) {
              // Clear the cookies for previous user and cart
              cookies.remove('prevID');
              cookies.remove('order_details');
              cookies.remove('prevName');
              // Alert the user that they are login and ready for next action
              var titleDescription = "Signed In As " + student.studentName;
              var textDescription = "What do you want to do next?";
              PopupOptions(titleDescription, textDescription);
              // Else if the user clicked "Check out old cart"
            } else if (result.isDenied) {
              // Redirect to checkout page
              window.location = "/checkout";
              // Alert the user that the website is redirecting them
              Swal.fire({
                icon: 'info',
                title: 'Redirecting to checkout...',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
          // Else, alert logged in message
        } else {
          var titleDescription = "Signed In As " + student.studentName;
          var textDescription = "What do you want to do next?";
          setLoading(false);
          PopupOptions(titleDescription, textDescription);
        }
      }
    })
    // If the studentID isn't in the sheet
    if (!check) {
      // end loading screen and show warning
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Student ID not found',
        text: 'Please try again.',
        showCloseButton: true
      })
    }
  }
  // Function to handle pressing Enter when typing studentID
  function handleEnter(e, currID) {
    // Prevent self-load page
    e.preventDefault();
    // Call the function handleSubmit
    handleSubmit(currID);
  }
  // Check the cookies if currentID existed or not
  useEffect(() => {

    if (cookies.get('currentID')) {
      var order_details = cookies.get('order_details');
      // If there is an order_details cookies, there is an uncommited cart
      if (typeof order_details !== "undefined" && order_details.length > 0) {
        Swal.fire({
          title: "Existing Cart!",
          text: "The previous user forgot to commit the cart. What would you like to do? ",
          icon: "warning",
          showCloseButton: true,
          showConfirmButton: true,
          confirmButtonText: "Start your new cart",
          showDenyButton: true,
          denyButtonText: "Check out old cart",
        }).then((result) => {
          if (result.isConfirmed) {
            cookies.remove('prevID');
            cookies.remove('order_details');
            cookies.remove('prevName');
            var titleDescription = "Signed In As " + student.studentName;
            var textDescription = "What do you want to do next?";
            PopupOptions(titleDescription, textDescription);
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
      } else {
        var titleDescription = "Signed In As " + cookies.get('studentName');
        var textDescription = "What do you want to do next?";
        setCurrentID(cookies.get('currentID'));
        PopupOptions(titleDescription, textDescription);
      }
    }
  }, [])

  return (
    <main>
      {loading ? (
        <>
          <Loading load={loading} />
        </>
      ) : <div className="login-container">
          <input className="c-checkbox" type="checkbox" id="start" />
          <input className="c-checkbox" type="checkbox" id="finish" />
          <div className="c-formContainer">
            <form className="c-form" action="" value={currentID}
              onChange={(e) => setCurrentID(e.target.value)}
              onSubmit={(e) => handleEnter(e, currentID)}
            >
              <div className="c-form__group">
                <label className="c-form__label" htmlFor="username">
                  <input
                    type="text"
                    id="username"
                    className="c-form__input"
                    placeholder=" "
                    pattern="^[nN].*"
                    required />

                  <label className="c-form__next" htmlFor="finish" role="button" onClick={() => handleSubmit(currentID)}>
                    <span className="c-form__nextIcon"></span>
                  </label>

                  <span className="c-form__groupLabel">Enter your student ID.</span>
                  <b className="c-form__border"></b>
                </label>
              </div>

              <label className="c-form__toggle" htmlFor="start">Login<span className="c-form__toggleIcon"></span></label>
            </form>
          </div>
          <img className="login-img" src="" />
          <img className="logo-img" src="/img/logo_white.png" alt="qutmotorsport_logo" />
          <img className="component-store-logo" src="/img/component_store_white_andrew.png" alt="qutmotorsport_logo" />
        </div>}
    </main>
  );
}

export async function getStaticProps(context) {
  const students = await getStudentID();
  return {
    props: {
      students,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 100, // In seconds
  };
}