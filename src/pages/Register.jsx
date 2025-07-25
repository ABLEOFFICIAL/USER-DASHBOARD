import React, { useContext, useRef, useState } from "react";
import Remove from "../assets/IconRemove.png";
import apple from "../assets/Apple.png";
import facebook from "../assets/Facebook.png";
import google from "../assets/Google.png";
import check from "../assets/Icon_2.png";
import view from "../assets/Icon_1.png";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Mybtn from "../components/Mybtn";
import { SignUpSchema } from "../../utils/SignUpSchema";
import { CiSquareCheck } from "react-icons/ci";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, iphoneProvider, provider } from "../config/firebase";

export const Xicon = () => {
  return (
    <>
      <img src={Remove} />
    </>
  );
};

const Register = () => {
  const { data, setData, screen, setScreen } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // register
  const handleCreateUser = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate("/profile-info");
    } catch (err) {
      console.error("Firebase Auth Error:", err.message);
    }
  };
  // login
  const handleSignIn = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      alert("Signed in successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  // google sign up
  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Signed in successfully with Google");
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google", error);
      if (error.code === "auth/popup-blocked") {
        alert(
          "Popup was blocked by your browser. Please allow popups for this site and try again."
        );
      } else {
        alert("An error occurred during Google sign-in. Please try again.");
      }
    }
  };
  // apple sign up
  const handleAppleSignUp = async () => {
    try {
      await signInWithPopup(auth, iphoneProvider);
      alert("Signed in successfully with Apple");
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google", error);
      if (error.code === "auth/popup-blocked") {
        alert(
          "Popup was blocked by your browser. Please allow popups for this site and try again."
        );
      } else {
        alert("An error occurred during Google sign-in. Please try again.");
      }
    }
  };

  return (
    <main className="bg-[#FBFBFB] flex justify-center items-center min-h-screen">
      <Card className="flex flex-col justify-around   px-[44px] py-[32px]">
        <div className="flex justify-between items-center ">
          <div className="h-[56px] w-[120px] flex justify-between items-center  font-normal text-[16px] leading-[24px]">
            <Link
              onClick={() => setScreen("register")}
              className={`cursor-pointer ${
                screen === "register" && "border-b-2 border-[#ef498f] py-3"
              }`}
            >
              Register
            </Link>
            <Link
              onClick={() => setScreen("login")}
              className={`cursor-pointer ${
                screen === "login" && "border-b-2 border-[#ef498f] py-3"
              }`}
            >
              Login
            </Link>
          </div>
          <Xicon />
        </div>

        {/* socials */}
        <div className="h-[48px] w-[176px] flex gap-[16px]">
          <img
            onClick={handleAppleSignUp}
            src={apple}
            className="cursor-pointer"
          />
          <img src={facebook} className="cursor-pointer" />
          <img
            onClick={handleGoogleSignUp}
            src={google}
            className="cursor-pointer"
          />
        </div>

        {/* form */}
        <div className=" h-[316px] max-w-[414px] flex flex-col justify-between">
          <span className="font-normal text-[13px] leading-[20px] text-[#1a0710]/40">
            {screen === "register" && "or register with email"}
            {screen === "login" && "or login with email"}
          </span>
          <Formik
            initialValues={{
              email: data.email,
              password: data.password,
              subscription: data.subscription || false,
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (values) => {
              const updatedData = { ...data, ...values };
              setData(updatedData);
              console.log("Updated global form data:", updatedData);
              {
                screen === "register"
                  ? await handleCreateUser(updatedData)
                  : await handleSignIn(updatedData);
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className={`h-[265px] flex flex-col justify-between`}>
                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 rounded focus:outline-1 focus:outline-[#5932ea]"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="relative">
                  <Field name="password">
                    {({ field, meta }) => (
                      <div className="relative">
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="w-full p-2 border-[1px] h-[56px] border-[#1a0710]/40 rounded focus:outline-2 focus:outline-[#5932ea]"
                        />
                        {meta.touched && meta.error && (
                          <div className="text-red-500 text-sm">
                            {meta.error}
                          </div>
                        )}

                        <div className="absolute top-0 right-0 h-[56px] w-14 flex justify-center items-center">
                          {showPassword ? (
                            <FaRegEyeSlash
                              onClick={() => setShowPassword(false)}
                              className="size-5 text-neutral-600 cursor-pointer"
                            />
                          ) : (
                            <FaRegEye
                              onClick={() => setShowPassword(true)}
                              className="size-5 text-neutral-600 cursor-pointer"
                            />
                          )}
                        </div>

                        {/* <span className="font-normal text-[13px] leading-[20px] text-[#1a0710]/65">
                          8+ characters
                        </span> */}
                      </div>
                    )}
                  </Field>
                  {/* {showPassword ? (
                    <div className="absolute top-0 right-0 h-[56px] w-14 flex justify-center items-center">
                      <FaRegEyeSlash
                        onClick={hidePasskey}
                        className="size-5 text-neutral-600 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="absolute top-0 right-0 h-[56px] w-14 flex justify-center items-center">
                      <FaRegEye
                        onClick={revealPasskey}
                        className="size-5 text-neutral-600 cursor-pointer"
                      />
                    </div>
                  )} */}
                  <span className="font-normal text-[13px] leading-[20px] text-[#1a0710]/65">
                    8+ characters
                  </span>
                </div>
                <div className="h-[88px] flex flex-col justify-between">
                  <Mybtn type="submit">
                    {screen === "register" && "Create account"}
                    {screen === "login" && "Login to Dashboard"}
                  </Mybtn>
                  <div className="flex gap-3 items-center">
                    {values.subscription ? (
                      <CiSquareCheck
                        className="size-5"
                        onClick={() => setFieldValue("subscription", false)}
                      />
                    ) : (
                      <span
                        onClick={() => setFieldValue("subscription", true)}
                        className="w-4 h-4 rounded-sm bg-[#ef498f]/12 cursor-pointer"
                      ></span>
                    )}
                    <Field
                      type="hidden"
                      name="subscription"
                      value={values.subscription}
                    />
                    <span>
                      {screen === "register" && "Send me news and promotions"}
                      {screen === "login" && "Remember me"}
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* t & c */}
        <div className="">
          {screen === "register" ? (
            <p className="max-w-[296px] mx-auto text-[11px] leading-4 font-normal text-center">
              By continuing I agree with the
              <span className="underline text-blue-500">
                Terms & Conditions, Privacy Policy
              </span>
            </p>
          ) : (
            <p className="max-w-[296px] mx-auto text-[11px] leading-4 font-normal text-center"></p>
          )}
        </div>
      </Card>
    </main>
  );
};

export default Register;
