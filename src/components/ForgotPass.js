import { sendPasswordResetEmail } from "firebase/auth";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import rocketImg from "../assets/cloud.png";
import { auth } from "../firebaseConfig";
import validate from "../functions/validate";
import { SignInTextField } from "./SignInTextField";

export const ForgotPass = () => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  let actionCodeSettings = {
    url: "http://localhost:3000/",
  };
  const handlePassReset = async (values) => {
    try {
      await sendPasswordResetEmail(auth, values, actionCodeSettings);
      setColor("success");
      setMessage(
        "Password Reset link sent successfully, check your inbox for further instructions."
      );
    } catch (error) {
      console.log(error);
      setColor("danger");
      setMessage(
        "Failed to send email of passsword reset link. Please try later."
      );
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5 me-5">
          <div>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={validate.email}
              onSubmit={(values) => {
                handlePassReset(values.email);
              }}
            >
              {(formik) => (
                <div>
                  <h1 className="my-4 font-weight-bold display-6">
                    Change Password
                  </h1>
                  <Form>
                    <SignInTextField label="Email" name="email" type="email" />
                    <div className="d-flex flex-column justify-content-center text-center">
                      <label className={`text-${color} mt-3 fs-6`}>
                        {message}
                      </label>
                      <div className="my-2">
                        Changed Password?
                        <Link
                          to="/login"
                          className="ms-1 text-decoration-none"
                          style={{ color: "#6C63FF" }}
                        >
                          <b>Sign In</b>
                        </Link>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-success mt-2 mb-4 me-2 w-50"
                          type="submit"
                          style={{ backgroundColor: "#6C63FF" }}
                        >
                          Send link
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src={rocketImg} alt="" />
        </div>
      </div>
    </div>
  );
};
