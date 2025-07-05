import React, { useContext } from "react";
import Card from "../components/Card";
import Mybtn from "../components/Mybtn";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Xicon } from "./Register";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AddressSchema } from "../../utils/SignUpSchema";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const Address2 = () => {
  const { data, setData } = useContext(UserContext);
  const navigate = useNavigate();
  const nextstep = () => {
    navigate("/success");
  };

  return (
    <main className="bg-[#FBFBFB] flex justify-center items-center min-h-scree">
      <Card className="flex flex-col justify-around   px-[44px] py-[32px]">
        <div className="flex justify-between items-center">
          <div className="h-[28px] w-[179px] flex justify-between items-center  font-bold">
            <h3 className="text-[#1a0710]/85 text-[20px] leading-[28px]">
              Add Address
            </h3>
            <h3 className="text-[#6bc62d] text-[16px] leading-[24px]">
              3 of 3
            </h3>
          </div>
          <Xicon />
        </div>

        {/* form */}
        <Formik
          initialValues={{
            street: data.street,
            apartment: data.apartment,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
          }}
          validationSchema={AddressSchema}
          onSubmit={async (values) => {
            const updatedData = { ...data, ...values };
            setData(updatedData);
            try {
              const userId = auth.currentUser?.uid;
              if (!userId) {
                alert("User not authenticated.");
                return;
              }

              await setDoc(doc(db, "users", userId), updatedData);
              console.log("Data saved:", updatedData);
              navigate("/success");
            } catch (error) {
              console.error("Firestore error:", error);
            }
          }}
        >
          {({ values }) => (
            <Form className="h-[85%] flex flex-col justify-between">
              <div className="h-[80%] flex flex-col justify-around">
                <div>
                  <Field
                    name="street"
                    type="text"
                    placeholder="Street address"
                    className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 rounded focus:outline-1 focus:outline-[#5932ea] text-[#1a0710]/65"
                  />
                  <ErrorMessage
                    name="street"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Field
                    name="apartment"
                    type="text"
                    placeholder="Apartment"
                    className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 rounded focus:outline-1 focus:outline-[#5932ea] text-[#1a0710]/65"
                  />
                  <ErrorMessage
                    name="apartment"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Field
                    name="city"
                    type="text"
                    value={data.location ? data.location : values.city}
                    placeholder="city"
                    className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 rounded focus:outline-1 focus:outline-[#5932ea] text-[#1a0710]/65"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex gap-5">
                  <div>
                    <Field
                      name="state"
                      type="text"
                      placeholder="State"
                      className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 rounded focus:outline-1 focus:outline-[#5932ea] text-[#1a0710]/65"
                    />
                    <ErrorMessage
                      name="state"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Field
                      name="zipCode"
                      type="text"
                      placeholder="Zip Code"
                      className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 rounded focus:outline-1 focus:outline-[#5932ea] text-[#1a0710]/65"
                    />
                    <ErrorMessage
                      name="zipCode"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              <Mybtn type="submit">Save information</Mybtn>
            </Form>
          )}
        </Formik>
      </Card>
    </main>
  );
};

export default Address2;
