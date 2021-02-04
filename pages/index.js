import { getStudentID } from "../lib/api";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import PopupOptions from '../component/popup_options';
import Swal from 'sweetalert2';
import Image from 'next/image';


export default function IndexPage({ students }) {

  const [currentID, setCurrentID] = useState("");
  // Cookies
  const cookies = new Cookies();
  const router = useRouter();

  function handleSubmit(student_ID) {
    var check = false;
    students.map((student) => {
      if (student.studentID === student_ID) {
        cookies.set('currentID', student_ID, { maxAge: 1000 });
        check = true;
        PopupOptions(student_ID);
      }
    })
    if (!check) {
      Swal.fire({
        icon: 'error',
        title: 'Student ID not found',
        text: 'Please try again.',
        showCloseButton: true
      })
    }
  }


  // Check in the cookies if currentID existed or not
  useEffect(() => {
    if (cookies.get('currentID')) {
      setCurrentID(cookies.get('currentID'));
      PopupOptions(cookies.get('currentID'));
    } else {
      console.log('Failed');
    }
  }, [])


  return (
    <main>
      <div className="login-container">
        <input className="c-checkbox" type="checkbox" id="start" />
        <input className="c-checkbox" type="checkbox" id="finish" />
        <div className="c-formContainer">
          <form className="c-form" action="" value={currentID}
            onChange={(e) => setCurrentID(e.target.value)}>
            <div className="c-form__group">
              <label className="c-form__label" htmlFor="username">
                <input
                  type="text"
                  id="username"
                  className="c-form__input"
                  placeholder=" "
                  pattern="^n.*"
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
        <img className="login-img" src="" alt="qutmotorsport_lando" width="300" height="100" />
      </div>
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