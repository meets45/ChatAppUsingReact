import React from "react";
import { Field, ErrorMessage } from "formik";
export const Dropdown = ({ name }) => {
  return (
    <>
      <div className="dropdown">
        <div className="d-flex flex-row justify-content-end align-items-baseline">
          <div className="d-flex justify-content-start w-100">
            <label htmlFor="hobby" className="me-4 mt-4 fs-6">
              Hobby
            </label>
          </div>

          <Field
            as="select"
            className="form-select form-select-sm fs-6 w-75"
            style={{ backgroundColor: "#f0f0ff", cursor: "pointer" }}
            name="hobby"
          >
            <option className="dropdown-item" selected hidden>
              Select a hobby
            </option>

            <option className="dropdown-item" name="hobby" value="Cricket">
              Cricket
            </option>
            <option className="dropdown-item" name="hobby" value="Volleyball">
              Volleyball
            </option>
            <option className="dropdown-item" name="hobby" value="Basketball">
              Basketball
            </option>
          </Field>
        </div>
      </div>
      <ErrorMessage component="div" name={name} className="error" />
    </>
  );
};
