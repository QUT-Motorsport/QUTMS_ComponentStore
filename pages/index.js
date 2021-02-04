import { getStudentID } from "../lib/api";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import PopupOptions from '../component/popup_options'
import Swal from 'sweetalert2'

export default function IndexPage({ students }) {

  const [currentID, setCurrentID] = useState("");
  // Cookies
  const cookies = new Cookies();

  function handleSubmit(student_ID) {
    var check = false;
    students.map((student) => {
      if (student.studentID === student_ID) {
        cookies.set('currentID', student_ID, { maxAge: 1000 });
        check = true;
        var titleDescription = "Signed In As " + student_ID;
        var textDescription = "What do you want to do next?";
        PopupOptions(titleDescription, textDescription);

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
      var titleDescription = "Signed In As " + cookies.get('currentID');
      var textDescription = "What do you want to do next?";
      setCurrentID(cookies.get('currentID'));
      PopupOptions(titleDescription, textDescription);
    } else {
      console.log('Failed');
    }
  }, [])


  return (
    <div className="container mx-auto py-20 px-8">
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