import { updatePassword } from "firebase/auth";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import rocketImg from "../assets/rocket.png";
import validateChangePass from "../functions/validateChangePass";
import { useAuth } from "../context/authContext";
import { useSelector } from "react-redux";
import { PasswordTextfield } from "./PasswordTextfield";
import { ConfirmPasswordTextfield } from "./ConfirmPasswordTextfield";

export const ChangePass = () => {
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user[0] === 0) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const handlePassChange = async (values) => {
    try {
      if (window.confirm("Are you sure you want to change the password? ")) {
        try {
          await updatePassword(currentUser, values.password);
          setColor("success");
          setMessage("Password changed sucessfully!");
        } catch (error) {
          console.log(error);
          setColor("danger");
          setMessage("Some error ocurred. Please Sign In again and try.");
        }
      } else {
        setColor("danger");
        setMessage("Password update unsuccessful");
      }
    } catch (error) {
      console.log(error);
      setColor("danger");
      setMessage("Failed to changed password. Please try again later.");
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <div>
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validateChangePass}
              onSubmit={(values) => {
                handlePassChange(values);
              }}
            >
              {(formik) => (
                <div>
                  <h1 className="my-4 font-weight-bold display-6">
                    Change Password
                  </h1>
                  <Form>
                    <PasswordTextfield
                      label="Password"
                      name="password"
                      type="password"
                      id="pass"
                    />
                    <ConfirmPasswordTextfield
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      id="cfpass"
                    />
                    <div className="d-flex flex-column justify-content-center text-center">
                      <label className={`text-${color} mt-3 fs-6`}>
                        {message}
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-success mt-2 me-2 w-50"
                            type="submit"
                            style={{ backgroundColor: "#6C63FF" }}
                          >
                            Change Password
                          </button>
                        </div>
                      </label>
                      <div className="my-2">
                        <Link
                          to="/profile"
                          className="ms-1 text-decoration-none"
                          style={{ color: "#6C63FF" }}
                        >
                          <b>Go back to Profile</b>
                        </Link>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-100" src={rocketImg} alt="" />
        </div>
      </div>
    </div>
  );
};
