import React from "react";
import signupBackground from "../assets/group.png";
import { SignUpForm } from "../components/SignUpForm";

export const SignUp = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5 me-5">
          <SignUpForm />
        </div>
        <div className="col-md-6 my-auto">
          <img className="img-fluid w-100" src={signupBackground} alt="" />
        </div>
      </div>
    </div>
  );
};
