import React from "react";
import { Field, ErrorMessage } from "formik";
export const DatePicker = ({ name }) => {
  return (
    <>
      <div className="d-flex mt-2 flex-row justify-content-end align-items-center">
        <div className="d-flex justify-content-start w-100">Select DOB</div>
        <Field
          type="text"
          name="date"
          min={`1940-01-01`}
          max={`2010-12-31`}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          style={{ backgroundColor: "#f0f0ff", cursor: "pointer" }}
          className="rounded date ms-2 p-2 form-control shadow-none w-100"
        ></Field>
      </div>
      <ErrorMessage component="div" name={name} className="error" />
    </>
  );
};
