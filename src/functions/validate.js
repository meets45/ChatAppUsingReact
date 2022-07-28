import * as Yup from "yup";
const validate = Yup.object({
  firstname: Yup.string()
    .max(12, "Must be 12 characters or less")
    .required("Firstname is Required"),
  lastname: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Lastname is Required"),
  username: Yup.string()
    .max(12, "Must be 12 characters or less")
    .required("Username is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 charaters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm password is required"),
  number: Yup.string()
    .min(10, "Please input valid mobile number")
    .required("Mobile number is required"),
  date: Yup.string().required("Birthdate is required"),
});

export default validate;
