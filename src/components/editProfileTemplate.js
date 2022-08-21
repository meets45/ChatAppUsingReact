import { Form, Formik } from "formik";
import React from "react";
import validateEdit from "../functions/validateEdit";
import profile from "../assets/profile.png";
import { TextField } from "./TextField";
import { DatePicker } from "./DatePicker";
import { Link } from "react-router-dom";
import profileEditBackground from "../assets/liquid.png";

export const EditProfileTemplate = ({
  user,
  img,
  setImg,
  setImageUpload,
  message,
  setShow,
  submit,
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-md-5">
          <Formik
            initialValues={{
              firstname: user.firstname,
              lastname: user.lastname,
              username: user.username,
              number: user.number,
              date: user.date,
            }}
            validationSchema={validateEdit}
            onSubmit={(values) => {
              submit(values);
            }}
          >
            {(formik) => (
              <div>
                <h1 className="my-4 font-weight-bold display-6">
                  Edit Profile
                </h1>
                <Form>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="d-flex justify-content-center">
                        <span>
                          <label
                            htmlFor="formId"
                            className="mb-0"
                            onChange={(e) => {
                              setImg(URL.createObjectURL(e.target.files[0]));
                              setImageUpload(e.target.files[0]);
                            }}
                          >
                            <input
                              name=""
                              type="file"
                              id="formId"
                              hidden
                              accept="image/png, image/jpeg"
                            />
                            <span className="c-pointer">
                              <span className="icon-edit-text">
                                <img
                                  src={img === "" ? profile : img}
                                  alt=""
                                  className="img-fluid mb-2 cursor"
                                  style={{
                                    width: "9rem",
                                    height: "9rem",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                  }}
                                />
                              </span>
                              <i className="c-icon c-icon--edit-red" />
                            </span>
                          </label>
                        </span>
                        <label
                          className="fa fa-edit cursor fs-4 text-light"
                          style={{
                            position: "absolute",
                            marginTop: "115px",
                          }}
                          htmlFor="formId"
                          title="Edit Profile Photo"
                        ></label>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="row">
                        <TextField
                          label="Firstname"
                          name="firstname"
                          type="text"
                        />
                      </div>
                      <div className="row">
                        <TextField
                          label="Lastname"
                          name="lastname"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>

                  <TextField label="Username" name="username" type="text" />
                  <TextField name="number" type="number" label="Phone number" />
                  <DatePicker name="date" age={formik.values.age} />
                  <div className="d-flex justify-content-center text-center">
                    <label className="error big my-3">{message}</label>
                    <button
                      className="btn btn-success mt-5 w-75"
                      type="submit"
                      style={{ backgroundColor: "#6C63FF" }}
                    >
                      <b>Update</b>
                    </button>
                  </div>
                  <div className="text-center mt-2">
                    <Link
                      to="/changePass"
                      className="text-decoration-none"
                      style={{ color: "#6C63FF" }}
                    >
                      Do you want to change password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <label
                      className="btn btn-link text-decoration-none"
                      style={{ color: "#6C63FF" }}
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      Go back to Profile
                    </label>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6 my-auto">
          <img className="img-fluid" src={profileEditBackground} alt="" />
        </div>
      </div>
    </div>
  );
};
