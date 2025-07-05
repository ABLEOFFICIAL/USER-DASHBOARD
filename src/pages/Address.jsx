import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Xicon } from "./Register";
import { AddressSchema } from "../../utils/SignUpSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Card from "../components/Card";
import Mybtn from "../components/Mybtn";
import { UserContext } from "../context/UserContext";
import search from "../assets/IconSearch.png";
import location from "../assets/Icon.png";
import user from "../assets/IconUsers.png";
import time from "../assets/IconTime.png";
import dollar from "../assets/IconDollar.png";

const Address = () => {
  const [inputLocation, setInputLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (inputLocation.length < 2) return;
      try {
        const res = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=pk.14a6777906b5a52f4098ead9393754ee&q=${inputLocation}&format=json&limit=100`
        );
        const data = await res.json();
        setLocationSuggestions(data);
      } catch (err) {
        console.error("Failed to fetch locations:", err);
      }
    };

    fetchLocations();
  }, [inputLocation]);

  const { data, setData } = useContext(UserContext);
  const navigate = useNavigate();
  // const nextstep = () => {
  //   // navigate("/");
  // };
  // const handleLocation = () => {
  //   navigate("/add-address2");
  // };
  const handleManual = () => {
    const updatedData = { ...data, location: "" };
    setData(updatedData);
    navigate("/add-address2");
    console.log(updatedData);
  };
  return (
    <main className="bg-[#FBFBFB] flex justify-center items-center min-h-screen">
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
            location: data.location,
          }}
          validationSchema={AddressSchema}
        >
          {({ values, setFieldValue }) => (
            <Form
              className={
                "h-[164px] max-w-[414px] flex flex-col justify-between mt-16 mb-28"
              }
            >
              <div className="relative">
                <div className="relative">
                  <Field
                    name="location"
                    type="text"
                    value={values.location}
                    onChange={(e) => {
                      setInputLocation(e.target.value);
                      setFieldValue("location", e.target.value);
                      // console.log(locationSuggestions);
                    }}
                    placeholder="Search for address"
                    className="w-full h-[56px] p-2 border-[1px] border-[#1a0710]/40 rounded focus:outline-1 focus:outline-[#5932ea] text-[#1a0710]/65 px-10"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                  <img src={search} className="absolute top-1/3 left-2" />
                </div>
                <span className="text-[#1a0710]/65 font-normal text-[13px] leading-[20px]">
                  Your address is not visible to other users
                </span>
                {!inputLocation.length == 0 && (
                  <div className="absolute top-full bg-white z-40 left-0 w-full shadow-2xl rounded-2xl p-3">
                    {locationSuggestions &&
                      locationSuggestions.map((location, index) => {
                        const selected = location.address.city;
                        return (
                          <span
                            type="button"
                            onClick={() => {
                              // submit manually
                              const updatedData = {
                                ...data,
                                location: selected,
                              };
                              setData(updatedData);
                              console.log("Submitted location:", updatedData);

                              navigate("/add-address2"); // or navigate to the next page
                            }}
                            key={index}
                            className="py-2 block"
                          >
                            {location.address.city}
                          </span>
                        );
                      })}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 border-[1px] border-[#ef498f]/40 p-2 rounded-xl">
                  <img src={location} />
                  <span className="text-[#5932ea] font-bold text-[13px] leading-[20px]">
                    Use current location
                  </span>
                </span>
                <span
                  onClick={handleManual}
                  className="text-[#5932ea] font-bold text-[13px] leading-[20px] border-[1px] border-[#ef498f]/40 p-2 rounded-xl"
                >
                  Add manually
                </span>
              </div>
            </Form>
          )}
        </Formik>
        {/* </div> */}

        <div className="w-[70%] h-[140px] flex flex-col justify-between">
          <h4 className="font-bold md:text-[20px] text-[17px] leading-[28px] text-[#1a0710]/85">
            Sharing your address shows:
          </h4>
          <div className="text-[#1a0710]/65 md:text-[15px] text-[14px] leading-[24px] h-[96px] flex flex-col justify-between">
            <p className="flex items-center gap-1">
              <img src={user} />
              <span>People near you</span>
            </p>
            <p className="flex items-center gap-1">
              <img src={time} />
              <span>Estimated delivery time</span>
            </p>
            <p className="flex items-center gap-1">
              <img src={dollar} />
              <span>Estimate shipping costs</span>
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default Address;
