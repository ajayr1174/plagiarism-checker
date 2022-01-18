import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Createassingment() {
  let user = JSON.parse(localStorage.getItem("user"));

  const [assingmnet, setAssingment] = useState({
    subject: "",
    year: "",
    submissionUrl: "",
    teacherid: "",
  });

  const [data, setData] = useState({
    subject: "",
    year: "",
  });

  const inputHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subject, year } = data;
    console.log(user.token);
    axios
      .post(
        "http://localhost:4000/assingment/t/create",
        { subject, year },
        {
          headers: {
            Authorization: `Beare ${user.token}`,
          },
        }
      )
      .then((e) => {
        const { subject, subjectcode, teacher, year } = e.data;
        setAssingment({
          subject: subject,
          year: year,
          submissionUrl: subjectcode,
          teacherid: teacher,
        });
        console.log(assingmnet);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  return (
    <>
      <Navbar user={user} />

      <div
        className="container bg-white mt-5"
        style={{
          width: "75vw",
          backgroundColor: "white",
          marginTop: "7rem",
          borderRadius: " 1rem",
        }}
      >
        <div className="row">
          <div className="col-md-7 mt-4 ms-2">
            <h3>Create Assingment</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-7">
            <form onSubmit={handleSubmit}>
              <div className="col-md-10 my-2 ms-2">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Subject"
                  onChange={inputHandler}
                  name="subject"
                  value={data.subject}
                />
              </div>

              <div className="col-md-10 my-2 ms-2">
                <label htmlFor="year" className="form-label">
                  Year
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  placeholder="Year"
                  onChange={inputHandler}
                  name="year"
                  value={data.year}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary col-md-4 py-2 my-3 ms-2"
                id="btn"
              >
                Create Assingment
              </button>
            </form>
          </div>
        </div>
      </div>

      {assingmnet.subject && (
        <div
          className="container mt-5"
          style={{
            width: "75vw",
            backgroundColor: "white",
            borderRadius: " 1rem",
            padding: "1rem",
          }}
        >
          <h4>Assingment Created Successfully</h4>
          <div className="assingment-details">
            <p>Submission url : {assingmnet.submissionUrl}</p>
            <p>Subject code: {assingmnet.subject}</p>
            <p>Year : {assingmnet.year}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Createassingment;
