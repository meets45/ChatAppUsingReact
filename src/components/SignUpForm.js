import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import validate from "../functions/validate";
import { DatePicker } from "./DatePicker";
import { Link, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import register from "../functions/register";
import { PasswordTextfield } from "./PasswordTextfield";
import { ConfirmPasswordTextfield } from "./ConfirmPasswordTextfield";
import { collection, getDocs } from "firebase/firestore";

export const SignUpForm = () => {
  let navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [exUsers, setexUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const userCollectionRef = collection(db, "users");
      const data = await getDocs(userCollectionRef);
      setTimeout(() => {
        setexUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.uid })));
      }, 1000);
    };
    getUser();
    // eslint-disable-next-line
  }, []);
  let phoneCheck;

  const checkPhone = (input) => {
    exUsers.forEach((element) => {
      if (element.number === input) {
        phoneCheck = true;
      }
    });
  };

  async function submit(values) {
    try {
      setMessage("");
      phoneCheck = false;
      checkPhone(values.number);
      if (!phoneCheck) {
        const user = await register(values.email, values.password);
        const doc1 = await doc(db, "users", user.user.uid);
        await setDoc(doc1, {
          firstname: values.firstname,
          lastname: values.lastname,
          username: values.username,
          email: values.email,
          number: values.number,
          profilePic: user.user.uid,
          date: values.date,
          id: user.user.uid,
          accountCreated: Date.now(),
        });
        navigate("/welcome");
      } else {
        setMessage(
          "Phone number is already registered, please use other number"
        );
      }
    } catch (error) {
      console.log(error);
      setMessage("User already exists use other email or Sign In");
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          number: "",
          date: "",
        }}
        validationSchema={validate}
        onSubmit={(values) => {
          submit(values);
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-3 font-weight-bold display-6">Sign Up</h1>
            <Form>
              <div className="d-flex flex-row justify-content-between flex-fill">
                <div className="flex-grow-1 me-2">
                  <TextField label="Firstname" name="firstname" type="text" />
                </div>
                <div className="flex-grow-1">
                  <TextField label="Lastname" name="lastname" type="text" />
                </div>
              </div>
              <TextField label="Username" name="username" type="text" />
              <TextField label="Email" name="email" type="email" />
              <div className="d-flex flex-row justify-content-between flex-fill">
                <div className="flex-grow-1 me-2">
                  <PasswordTextfield
                    label="Password"
                    name="password"
                    type="password"
                    id="pass"
                  />
                </div>
                <div className="flex-grow-1">
                  <ConfirmPasswordTextfield
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    id="cfpass"
                  />
                </div>
              </div>
              <TextField label="Phone Number" name="number" type="number" />
              <DatePicker name="date" />

              <div className="d-flex justify-content-center text-center">
                <label className="error big my-3">{message}</label>
                <button
                  className="btn btn-success mt-5 w-75"
                  type="submit"
                  style={{ backgroundColor: "#6C63FF" }}
                >
                  <b>Register</b>
                </button>
              </div>
            </Form>
            <div className="text-center">
              <div className="my-2">
                Have an account?
                <Link
                  to="/login"
                  className="ms-1 text-decoration-none"
                  style={{ color: "#6C63FF" }}
                >
                  <b>Sign In</b>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
