import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { SignInTextField } from "./SignInTextField";
import { PasswordTextfield } from "./PasswordTextfield";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validateLogin from "../functions/validateLogin";
import signin from "../functions/signin";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../state/index";
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const SignInForm = () => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (user[0] !== 0) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  let handleLogin = async (values) => {
    try {
      const user = await signin(values.email, values.password);
      const doc1 = doc(db, "users", user.user.uid);
      let user_data = await getDoc(doc1);
      user_data = user_data.data();
      user_data.uid = user.user.uid;
      const userCollectionRef = collection(
        db,
        "users",
        user.user.uid,
        "groups"
      );
      const data = await getDocs(userCollectionRef);
      let group = [];
      data.docs.forEach((doc) => {
        group.push(doc.id);
      });
      user_data.groups = group;
      console.log(user_data);
      dispatch(actionCreators.signInfunc(user_data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage("Details are incorrect");
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validateLogin}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold display-6">Sign In</h1>
            <Form>
              <SignInTextField label="Email" name="email" type="email" />
              <PasswordTextfield
                label="Password"
                name="password"
                type="password"
                id="pass"
              />

              <div className="d-flex justify-content-end">
                <Link
                  to="/forgotpass"
                  className="text-decoration-none mt-n2"
                  style={{ fontSize: "0.8rem", color: "#6C63FF" }}
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="d-flex justify-content-center text-center">
                <label className="error big">{message}</label>
                <button
                  className="btn btn-success mt-4 fs-6 p-2 w-50"
                  type="submit"
                  style={{ backgroundColor: "#6C63FF" }}
                >
                  <b>Sign In</b>
                </button>
              </div>
            </Form>
            <div className="text-center">
              <div className="my-2">
                Don't have an account?
                <Link
                  to="/signup"
                  className="ms-1 text-decoration-none"
                  style={{ color: "#6C63FF" }}
                >
                  <b>Sign Up</b>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
