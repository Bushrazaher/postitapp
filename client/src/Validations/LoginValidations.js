import * as yup from "yup"; //import all exports from the yup

export const loginSchemaValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),
});
  