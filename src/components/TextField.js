import React from "react";
import { useField, ErrorMessage } from "formik";

export const TextField = ({ label, defaultValue, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      {label}
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        placeholder={defaultValue}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
