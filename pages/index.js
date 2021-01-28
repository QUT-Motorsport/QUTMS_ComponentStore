import { getStudentID } from "../lib/api";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import Cookies from 'universal-cookie';
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function IndexPage({ students }) {

  const [currentID, setCurrentID] = useState("");
  // Cookies
  const cookies = new Cookies();
  const router = useRouter();

  function handleSubmit(student_ID) {
    students.map((student) => {
      if (student.studentID === student_ID) {
        cookies.set('currentID', student_ID, { maxAge: 100 });
        router.push('/options');
      }
    })
  }


  useEffect(() => {
    if (cookies.get('currentID')) {
      setCurrentID(cookies.get('currentID'));
      router.push('/options');
    } else {
      console.log('Failed');
    }
  }, [])


  return (
    <div>
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
            Click me
          </Button>

          {/* <h2 className="text-center text-accent-1 mb-16"
            style={valid ? { display: 'block' } : { display: 'none' }}>Validated + {cookies.get('currentID')}</h2> */}
        </Grid>

      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const students = await getStudentID();
  console.log("Front end");
  console.log(students);
  return {
    props: {
      students,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}