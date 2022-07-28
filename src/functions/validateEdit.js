import * as Yup from "yup";
const validateEdit = Yup.object({
  firstname: Yup.string()
    .max(12, "Must be 12 characters or less")
    .required("Firstname is Required"),
  lastname: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Lastname is Required"),
  username: Yup.string()
    .max(12, "Must be 12 characters or less")
    .required("Username is required"),
  number: Yup.string()
    .min(10, "Please input valid mobile number")
    .max(10, "Please input valid mobile number")
    .required("Mobile number is required"),
  date: Yup.date().required("Birthdate is required"),
});

export default validateEdit;
