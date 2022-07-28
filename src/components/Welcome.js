import { sendEmailVerification } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const Welcome = () => {
  let navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser !== "") {
      setTimeout(() => {
        let actionCodeSettings = {
          url: "http://localhost:3000/",
        };
        sendEmailVerification(currentUser, actionCodeSettings);

        navigate("/login");
      }, 7000);
    } else {
      navigate("/signup");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <h2>Welcome {currentUser.email}, your registration is successful.</h2>
      Please confirm your email by verification email we sent you.
      <br /> You will be redirected to Signin page in 5 seconds...
    </div>
  );
};
