import React, { useState } from "react";
import background from "./assets/images/signup.png";
import {Link} from "react-router-dom"
const axios = require("axios");

function Signup(props) {
  const { teacher } = props;
  const [border, setBorder] = useState(false);

  const [data, setData] = useState({
    fname: "",
    lname: "",
    rollno: "",
    email: "",
    password: "",
    confPassword: "",
    phoneno: "",
  });
  const inputHandler = (e) => {
    setBorder(false);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.password !== data.confPassword ||
      data.password === "" ||
      data.confPassword === ""
    ) {
      setBorder(true);
      // alert("confim password and password doesn't match")
    } else {
      setBorder(false);
      const { email, fname, lname, phoneno, password, rollno } = data;
      rollno === ""
        ? axios
            .post("http://localhost:4000/user/s/t/signup", {
              email,
              fname,
              lname,
              phoneno,
              password,
            })
            .then((e) => {
              console.log(e);
            })
            .catch((err) => console.log(err))
        : axios
        .post("http://localhost:4000/user/signup", {
          email,
          fname,
          lname,
          rollno,
          password,
        })
        .then((e) => {
          console.log(e);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div
        className="container "
        style={{
          backgroundColor: "white",
          marginTop: "6rem",
          borderRadius: "1rem",
        }}
      >
        <div className="row">
          <div className="col-md-7" style={{ padding: "3rem 3rem 0rem 3rem" }}>
            {teacher ? (
              <h2 style={{ paddingBottom: "2rem" }}> Register as a Teacher</h2>
            ) : (
              <h2 style={{ paddingBottom: "2rem" }}> Register as a Student</h2>
            )}

            <form onSubmit={handleSubmit}>
              {/* firstName and last name */}
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="First name"
                    aria-label="First name"
                    name="fname"
                    value={data.fname}
                    onChange={inputHandler}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Last name"
                    aria-label="Last name"
                    value={data.lname}
                    name="lname"
                    onChange={inputHandler}
                  />
                </div>
              </div>
              {/* phone number and email */}
              <div className="row">
                {teacher ? (
                  <div className="col">
                    <input
                      type="number"
                      className="form-control my-2"
                      placeholder="Phone No"
                      aria-label="phoneno"
                      value={data.phoneno}
                      name="phoneno"
                      onChange={inputHandler}
                    />
                  </div>
                ) : (
                  <div className="col">
                    <input
                      type="number"
                      className="form-control my-2"
                      placeholder="Roll No"
                      aria-label="Roll No"
                      value={data.rollno}
                      name="rollno"
                      onChange={inputHandler}
                    />
                  </div>
                )}
                <div className="col">
                  <input
                    type="email"
                    className="form-control my-2"
                    placeholder="Email"
                    aria-label="email"
                    value={data.email}
                    name="email"
                    onChange={inputHandler}
                  />
                </div>
              </div>
              {/* Password and confirm password */}
              <div className="row">
                <div className="col">
                  <input
                    type="password"
                    className={
                      border
                        ? "form-control my-2 border-danger border-2"
                        : "form-control my-2 "
                    }
                    placeholder="Password"
                    aria-label="Password"
                    value={data.password}
                    name="password"
                    onChange={inputHandler}
                  />
                </div>
                <div className="col">
                  <input
                    type="password"
                    className={
                      border
                        ? "form-control my-2 border-danger border-2"
                        : "form-control my-2 "
                    }
                    placeholder="Confirm Password"
                    aria-label="Password"
                    value={data.confPassword}
                    name="confPassword"
                    onChange={inputHandler}
                  />
                </div>
              </div>
              {border && (
                <p className="text-danger">
                  Password and Confirm Password should match.
                </p>
              )}
              {/* register button */}

              <button type="submit" className="btn btn-primary my-3" id="btn">
                Create Account
              </button>
            </form>

            {/* sign in */}

            <h6 className="d-inline-block mt-3 pb-4">
              Already have an Account? <Link to="/" className="mx-1">Sign In</Link>
            </h6>
            {teacher?<Link to="/signup-student" className="btn btn-primary mx-5">
              Sign Up as a Student
              </Link>: <Link to="/signup-teacher" className="btn btn-primary mx-5">
              Sign Up as a Teacher
              </Link>}
              
           
          </div>

          <div className="col-md-4">
            {/* poster */}

            <img
              src={background}
              className="float-right"
              id="hero-image"
              alt="..."
              style={{
                display: "block",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                paddingTop: "10%",
              }}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
