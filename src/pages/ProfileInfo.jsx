import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
// import { SignUpSchema } from "../../utils/SignUpSchema";
import Card from "../components/Card";
import Mybtn from "../components/Mybtn";
import { Xicon } from "./Register";
import click from "../assets/Auto Layout Horizontal.png";
import unclick from "../assets/Auto Layout Vertical.png";
import i from "../assets/IconInfo.png";
import { ProfileInfoSchema } from "../../utils/SignUpSchema";

const ProfileInfo = () => {
  const { data, setData } = useContext(UserContext);
  const navigate = useNavigate();
  const nextstep = () => {
    navigate("/add-address");
  };
  return (
    <main className="bg-[#FBFBFB] flex justify-center items-center min-h-screen">
      <Card className="flex flex-col justify-around   px-[44px] py-[32px]">
        <div className="flex justify-between items-center ">
          <div className="h-[28px] w-[261px] flex justify-between md:items-center items-start  font-bold flex-col md:flex-row">
            <h3 className="text-[#1a0710]/85 md:text-[20px] text-[16px] leading-[28px]">
              Personal Information
            </h3>
            <h3 className="text-[#6bc62d] text-[16px] leading-[24px]">
              2 of 3
            </h3>
          </div>
          <Xicon />
        </div>

        {/* form */}
        {/* <div className="  flex flex-col justify-between"> */}

        <Formik
          initialValues={{
            fullName: data.fullName,
            phone: data.phone,
            countryCode: data.countryCode || "+234",
            birthDay: data.birthDay,
            gender: data.gender || "male",
          }}
          validationSchema={ProfileInfoSchema}
          onSubmit={(values) => {
            const updatedData = { ...data, ...values };
            setData(updatedData);
            console.log("Updated global form data:", updatedData);
            nextstep();
          }}
        >
          {({ values, setFieldValue }) => (
            <Form
              className={"h-[73%] max-w-[414px] flex flex-col justify-between"}
            >
              <div className="h-[320px] flex flex-col justify-between">
                {" "}
                <div>
                  <Field
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 rounded focus:outline-1 focus:outline-[#5932ea] text-[#1a0710]/65"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* gender */}
                <div className="flex items-center gap-2 text-[#1a0710]/65">
                  <span>Gender:</span>
                  <div className="w-[146px] flex gap-2">
                    {/* male */}
                    <span className="flex justify-between items-center w-[61px] h-[24px]">
                      {/* button */}

                      <img
                        onClick={() => setFieldValue("gender", "male")}
                        src={values.gender === "male" ? click : unclick}
                      />

                      <span className="text-[#1a0710]/85">Male</span>
                    </span>
                    {/* female */}
                    <span className="flex gap-2 justify-between items-center w-[77px] h-[24px]">
                      {/* button */}
                      <img
                        onClick={() => setFieldValue("gender", "female")}
                        src={values.gender === "female" ? click : unclick}
                      />
                      <span className="text-[#1a0710]/85">Female</span>
                    </span>
                    <Field type="hidden" name="gender" value={values.gender} />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <img src={i} />
                  <span className="text-[#1a0710]/65 font-bold text-[13px] leading-[20px]">
                    The phone number and birthday are only visible to you
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <select
                    value={values.countryCode}
                    onChange={(e) =>
                      setFieldValue("countryCode", e.target.value)
                    }
                    className="w-[35%] p-2 border-[1px] h-[56px] border-[#1a0710]/40 rounded  focus:outline-2 focus:outline-[#5932ea] flex justify-center items-center gap-1 text-[#1a0710]/65"
                  >
                    <option value="+234">+234</option>
                    <option value="+221">+221</option>
                    <option value="+437">+437</option>
                    <option value="+91">+91</option>
                  </select>
                  <Field
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    className="w-[80%] p-2 border-[1px] h-[56px] border-[#1a0710]/40 rounded  focus:outline-2 focus:outline-[#5932ea] text-[#1a0710]/65"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* birthday */}
                <div>
                  <Field
                    name="birthDay"
                    type="date"
                    placeholder="Birth Day"
                    className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 text-[#1a0710]/65 rounded focus:outline-1 focus:outline-[#5932ea]"
                  />
                  <ErrorMessage
                    name="birthDay"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <span className="font-normal text-[13px] leading-[20px] text-[#1a0710]/65">
                    Let us know about your birthday so as not to miss a gift
                  </span>
                </div>
              </div>

              <Mybtn type="submit">Save information</Mybtn>
            </Form>
          )}
        </Formik>
        {/* </div> */}
      </Card>
    </main>
  );
};

export default ProfileInfo;
