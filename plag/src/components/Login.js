import React, { useState, useEffect } from "react";
import background2 from "./assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import jwtDecode from "jwt-decode";

function Login({ teacher }) {

  const navigate = useNavigate();

  const init = {
    rollno: "",
    password: "",
    email: "",
  };

  const [data, setData] = useState(init);

  const [border, setBorder] = useState(false);
  const [errormsg, setErrormsg] = useState("");

  useEffect(() => {
    setData(init);
    return () => {
      setBorder(false);
      setErrormsg("");
      setData(init);
    };
  }, [teacher]);

  const inputHandler = (e) => {
    setErrormsg("");
    setBorder(false);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const hadleSubmit = (e) => {
    e.preventDefault();
    if (teacher && (data.email === "" || data.password === "")) {
      setBorder(true);
      setErrormsg("Value can not be empty");
    } else if (!teacher && (data.rollno === "" || data.password === "")) {
      setBorder(true);
      setErrormsg("Value can not be empty");
    } else {
      const { email, password, rollno } = data;
      teacher
        ? axios
            .post("http://localhost:4000/user/s/t/signin", {
              email,
              password,
            })
            .then((e) => {
              console.log(e.data.token);
              let user = jwtDecode(e.data.token)
              user.token = e.data.token;
              user.teacher = true;
              localStorage.setItem("user", JSON.stringify(user));
              navigate("/teacher", {user:user})
            })
            .catch((err) => {
              setBorder(true);
              setErrormsg(err.response.data.err);
            })
        : axios
            .post("http://localhost:4000/user/signin", {
              rollno,
              password,
            })
            .then((e) => {
              // console.log(e);
              let user = jwtDecode(e.data.token)
              user.token = e.data.token;
              user.student = true;
              localStorage.setItem("user", JSON.stringify(user));
              navigate("/student")

            })
            .catch((err) => {
              setBorder(true);
              console.log(err.response.data.err);
              setErrormsg(err.response.data.err);
            });
    }
  };

  return (
    <>
      <div
        className="container "
        style={{
          backgroundColor: "white",
          marginTop: "7rem",
          borderRadius: " 1rem",
        }}
      >
        <div className="row">
          <div className="col-md-7" style={{ padding: "3rem" }}>
            {teacher ? (
              <h2 style={{ paddingBottom: "2rem" }}>Login as Teacher</h2>
            ) : (
              <h2 style={{ paddingBottom: "2rem" }}>Login as Student</h2>
            )}

            {/* username$password */}

            <form style={{ paddingTop: "1rem" }} onSubmit={hadleSubmit}>
              {!teacher ? (
                <div className="col-md-10">
                  <label htmlFor="rollno" className="form-label">
                    Roll No
                  </label>
                  <input
                    type="number"
                    className={
                      !border
                        ? "form-control"
                        : `form-control border-danger border-2`
                    }
                    id="rollno"
                    placeholder="Roll No"
                    onChange={inputHandler}
                    name="rollno"
                    value={data.rollno}
                  />
                </div>
              ) : (
                <div className="col-md-10">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className={
                      !border
                        ? "form-control"
                        : `form-control border-danger border-2`
                    }
                    id="email"
                    placeholder="Email"
                    onChange={inputHandler}
                    name="email"
                    value={data.email}
                  />
                </div>
              )}
              {errormsg && <span className="text-danger">{errormsg}</span>}
              <div className="col-md-10">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={
                    !border
                      ? "form-control"
                      : `form-control border-danger border-2`
                  }
                  id="inputAddress"
                  placeholder="Password"
                  onChange={inputHandler}
                  name="password"
                  value={data.password}
                />
              </div>
              {errormsg && <span className="text-danger">{errormsg}</span>}
              {/* remember and reset password */}

              <div
                className="checkbox col-md-10 "
                style={{ padding: "1rem 0", textAlign: "end" }}
              >
                <a href="/"> Reset password?</a>
              </div>

              {/* button*/}

              <button
                type="submit"
                className="btn btn-primary col-md-4 py-2 me-5"
                id="btn"
              >
                Login
              </button>

              {teacher ? (
                <Link
                  type="submit"
                  className="btn btn-secondary col-md-5 py-2 ms-2"
                  id="btn"
                  to="/"
                >
                  Login as Student
                </Link>
              ) : (
                <Link
                  type="submit"
                  className="btn btn-secondary col-md-5 py-2 ms-2"
                  id="btn"
                  to="/login-teacher"
                >
                  Login as Teacher
                </Link>
              )}

              {/* footer text */}
              <h6
                className="col-md-10"
                style={{
                  textAlign: "left",
                  paddingTop: "2rem",
                }}
              >
                Don't have an account yet?{" "}
                <Link to="/signup-student" className="ms-4">
                  Join Plagiarism Checker
                </Link>
              </h6>
            </form>
          </div>

          {/* poster */}

          <div className="col-md-4">
            <img
              src={background2}
              className="float-right"
              id="hero-image"
              alt="..."
              style={{
                display: "block",
                width: "100%",
                Align: "center",
                paddingTop: "30%",
              }}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
