import { getStudentID } from "../lib/api";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import PopupOptions from '../component/popup_options'
import Swal from 'sweetalert2'

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
    <div className="container mx-auto py-20 px-8">
      <div id="big_img">
        <img alt="QUT Motorsport" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp" />
      </div>
      <Grid container direction="column" alignItems="center" justify="center">
        <TextField
          value={currentID}
          onChange={(e) => setCurrentID(e.target.value)}
          id="standard-basic" label="Student ID" />

        <Button
          onClick={() => handleSubmit(currentID)}
          variant="contained"
          color="primary">
          Login
          </Button>

      </Grid>

    </div>
  );
}

export async function getStaticProps(context) {
  const students = await getStudentID();
  console.log(students);
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