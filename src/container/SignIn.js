import React from "react";
import loginBackground from "../assets/drip.png";
import { SignInForm } from "../components/SignInForm";

export const SignIn = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <SignInForm />
        </div>
        <div className="col-md-7">
          <img className="img-fluid" src={loginBackground} alt="" />
        </div>
      </div>
    </div>
  );
};
