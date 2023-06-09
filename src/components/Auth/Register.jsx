import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";

import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerME = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log("User created sucessfully");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register Sucesfully 😘",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">User already Exist 😪</a>',
        });
      });
    setName("");
    setEmail("");
    setPassword("");
  };

  const loginMe = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ userCredential }) => {
        const user = userCredential;
        console.log("user login sucessfully");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Sucessfull 🤩",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! 😥",
          footer: '<a href="">Wrong Credential</a>',
        });
      });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <ul
        className="nav nav-pills nav-justified mb-3"
        style={{ margin: "100px auto", width: "30%" }}
      >
        <li className="nav-item">
          <a
            className={`nav-link ${login ? "active" : ""} `}
            onClick={() => {
              setLogin(true);
              setRegister(false);
            }}
          >
            Login
          </a>
        </li>
        <li className="nav-item ">
          <a
            className={`nav-link ${register ? "active" : ""} `}
            onClick={() => {
              setLogin(false);
              setRegister(true);
            }}
          >
            Register
          </a>
        </li>
      </ul>

      <div className="tab-content">
        <div>
          {login ? (
            <form action="" onSubmit={loginMe}>
              <div className="" style={{ margin: "100px auto", width: "30%" }}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="loginName"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                  <label className="form-label" for="loginName">
                    Email or username
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" for="loginPassword">
                    Password
                  </label>
                </div>

                {/* <!-- 2 column grid layout --> */}

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>

                {/* <!-- Register buttons --> */}
                <div className="text-center">
                  <p>
                    Not a member?{" "}
                    <a
                      href="#!"
                      onClick={() => {
                        setLogin(false);
                        setRegister(true);
                      }}
                    >
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <form action="" onSubmit={registerME}>
              <div className="" style={{ margin: "100px auto", width: "30%" }}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="regname"
                    className="form-control"
                  />
                  <label className="form-label" for="loginName">
                    Name
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="loginName"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                  <label className="form-label" for="loginName">
                    Email or userName
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" for="loginPassword">
                    Password
                  </label>
                </div>

                {/* <!-- 2 column grid layout --> */}

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>

                {/* <!-- Register buttons --> */}
                <div className="text-center">
                  <p>
                    Not a member?{" "}
                    <a
                      href="#!"
                      onClick={() => {
                        setLogin(true);
                        setRegister(false);
                      }}
                    >
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </form> // <form>
            //   {/* <div className="text-center mb-3">
            //   <p>Sign up with:</p>
            //   <button type="button" className="btn btn-link btn-floating mx-1">
            //     <i className="fab fa-facebook-f"></i>
            //   </button>

            //   <button type="button" className="btn btn-link btn-floating mx-1">
            //     <i className="fab fa-google"></i>
            //   </button>

            //   <button type="button" className="btn btn-link btn-floating mx-1">
            //     <i className="fab fa-twitter"></i>
            //   </button>

            //   <button type="button" className="btn btn-link btn-floating mx-1">
            //     <i className="fab fa-github"></i>
            //   </button>
            // </div> */}

            //   {/* <!-- Name input --> */}
            //   <div className="form-outline mb-4">
            //     <input type="text" id="registerName" className="form-control" />
            //     <label className="form-label" for="registerName">
            //       Name
            //     </label>
            //   </div>

            //   {/* <!-- Username input --> */}
            //   <div className="form-outline mb-4">
            //     <input
            //       type="text"
            //       id="registerUsername"
            //       className="form-control"
            //     />
            //     <label className="form-label" for="registerUsername">
            //       Username
            //     </label>
            //   </div>

            //   {/* <!-- Email input --> */}
            //   <div className="form-outline mb-4">
            //     <input
            //       type="email"
            //       id="registerEmail"
            //       className="form-control"
            //     />
            //     <label className="form-label" for="registerEmail">
            //       Email
            //     </label>
            //   </div>

            //   {/* <!-- Password input --> */}
            //   <div className="form-outline mb-4">
            //     <input
            //       type="password"
            //       id="registerPassword"
            //       className="form-control"
            //     />
            //     <label className="form-label" for="registerPassword">
            //       Password
            //     </label>
            //   </div>

            //   {/* <!-- Repeat Password input --> */}
            //   <div className="form-outline mb-4">
            //     <input
            //       type="password"
            //       id="registerRepeatPassword"
            //       className="form-control"
            //     />
            //     <label className="form-label" for="registerRepeatPassword">
            //       Repeat password
            //     </label>
            //   </div>

            //   {/* <!-- Checkbox --> */}
            //   <div className="form-check d-flex justify-content-center mb-4">
            //     <input
            //       className="form-check-input me-2"
            //       type="checkbox"
            //       value=""
            //       id="registerCheck"
            //       checked
            //       aria-describedby="registerCheckHelpText"
            //     />
            //     <label className="form-check-label" for="registerCheck">
            //       I have read and agree to the terms
            //     </label>
            //   </div>

            //   {/* <!-- Submit button --> */}
            //   <button type="submit" className="btn btn-primary btn-block mb-3">
            //     Sign in
            //   </button>
            // </form>
          )}
        </div>
      </div>
      {/* <!-- Pills content --> */}
    </div>
  );
};

export default Register;
