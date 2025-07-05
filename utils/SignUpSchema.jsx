import * as yup from "yup";
export const SignUpSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Enter field!"),
  password: yup
    .string()
    .min(8, "password must be atleast 8 characters long!")
    .required("This field is required!"),
});
export const ProfileInfoSchema = yup.object().shape({
  fullName: yup.string().required("Enter Full Name!"),
  phone: yup
    .string()
    .length(10, "Enter valid phone Number!")
    .matches(/^\d{10}$/, "invalid number")
    .required("Enter phone Number!"),
  birthDay: yup.string(),
});
export const AddressSchema = yup.object().shape({
  street: yup.string().required("Enter street address!"),
  apartment: yup.string(),
  city: yup.string().required("Enter city name!"),
  state: yup.string().required("Enter state!"),
  zipCode: yup.string().required("code required!"),
});
