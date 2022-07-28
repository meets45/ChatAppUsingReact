import React, { useState } from "react";
import { useField, ErrorMessage } from "formik";

export const PasswordTextfield = ({ label, defaultValue, ...props }) => {
  const [field, meta] = useField(props);

  const [icon, setIcon] = useState("eye-slash");
  function showPass() {
    let field = document.getElementById("pass");
    if (field.type === "text") {
      field.type = "password";
      setIcon("eye-slash");
    } else {
      field.type = "text";
      setIcon("eye");
    }
  }

  return (
    <div className="mb-4">
      {label}
      <div className="pass">
        <input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          placeholder={defaultValue}
          autoComplete="off"
        />
        <i
          className={`i fa-solid fa-${icon}`}
          onClick={() => showPass()}
          title="Show Password"
        ></i>
      </div>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
