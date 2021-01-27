import { getStudentID } from "../lib/api";
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

export default function IndexPage({ students }) {

  const [currentID, setCurrentID] = useState("");
  const [valid, setValid] = useState(false);

  function handleSubmit(student_ID) {
    var check = false;
    students.map((student) => {
      if (student.studentID === student_ID) {
        check = true;
        setValid(true);
      }
    })

    if (!check) {
      setValid(false);
    }
  }

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
        </Grid>

        <h2
          className="text-center text-accent-1 mb-16"
        >You entered: {currentID}</h2>

        <h2 id="isValid" style={valid ? { display: 'block' } : { display: 'none' }}>Validated</h2>

        {/* <div>
          {students.slice(1)
            .map(({ studentID, studentName }) => (
              <a
                key={studentID + '1'}
              >
                <h3 className="font-bold mb-2">{studentID}:{studentName}</h3>

              </a>
            ))}
        </div> */}

        {/* <div className="text-center mt-8">
          {students.slice(students.length - 1).map(({ studentID, studentName }) => (
            <div className="markdown inline-p">
              <strong>{studentID}</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: studentName }} />
            </div>
          ))}
        </div> */}
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