import React from "react";
import { Field, ErrorMessage } from "formik";
export const RadioButton = ({ name }) => {
  return (
    <>
      <div className="d-flex mt-4 flex-row justify-content-end align-items-center">
        <div className="d-flex justify-content-start w-100">
          <label className="fs-6"> Gender</label>
        </div>
        <div className="mx-1 form-check form-check-inline">
          <Field
            className="form-check-input radio"
            type="radio"
            name="gender"
            id="male"
            value="Male"
          />
          <label className="form-check-label me-4 radio fs-6" htmlFor={"male"}>
            Male
          </label>
        </div>
        <div className="mx-1 form-check form-check-inline">
          <Field
            className="form-check-input radio"
            type="radio"
            name="gender"
            id="female"
            value="Female"
          />
          <label className="form-check-label radio fs-6" htmlFor="female">
            Female
          </label>
        </div>
      </div>
      <ErrorMessage component="div" name={name} className="error" />
    </>
  );
};
