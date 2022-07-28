import React from "react";
import { Field, ErrorMessage } from "formik";
export const Slider = ({ name, value }) => {
  return (
    <>
      <div className="d-flex mt-4 flex-row justify-content-end align-items-center">
        <div className="d-flex justify-content-start w-100">
          <label htmlFor="age" className="form-label fs-6">
            Age (in Years)
          </label>
        </div>
        {value}
        <Field
          type="range"
          min={12}
          max={80}
          className="form-range w-75 ms-2"
          id="age"
          value={value}
        ></Field>
      </div>

      <ErrorMessage component="div" name={name} className="error" />
    </>
  );
};
