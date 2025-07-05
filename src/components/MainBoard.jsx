import React, { useEffect, useState } from "react";
import search from "../assets/IconSearch.png";
import userIcon from "../assets/profile-2user.png";
import tick from "../assets/profile-tick.png";
import monitor from "../assets/monitor.png";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const Search = ({ className }) => {
  return (
    <div className="relative">
      <input
        type="text"
        name="search"
        className={`pl-8 h-[38px] rounded-[12px] shadow-md focus:outline-none ${className}`}
      />
      <img src={search} className="absolute top-1/4 left-1.5" />
    </div>
  );
};

const MainBoard = () => {
  const [user, setUser] = useState(null);
  const [customUser, setCustomUser] = useState(null);
  const [customers, setCustomers] = useState([]);

  // Handle user authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("User updated:", user);
  }, [user]);

  // Fetch customers
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        const customerData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    fetchCustomers();
  }, []);

  // Log customers
  useEffect(() => {
    console.log("Customer data updated:", customers);
  }, [customers]);

  // Fetch custom user data
  useEffect(() => {
    async function fetchCustomUser() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const customUserData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomUser(customUserData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    fetchCustomUser();
  }, []);

  // Log customers
  useEffect(() => {
    console.log("Customer data updated:", customUser);
  }, [customUser]);

  return (
    customUser && (
      <main
        style={{ scrollbarWidth: "none" }}
        className="overflow-x-hidden h-screen"
      >
        <div className=" md:w-[968px] w-screen px-5 md:px-0 mr-[14rem] my-[3rem] bg-transparent flex flex-col gap-[2rem]">
          <div className="flex flex-col md:flex-row items-end gap-5 justify-between md:items-center">
            <h1 className="font-normal text-[24px] leading-[100%]">
              Hello {customUser[0].fullName} 👋🏼,
            </h1>
            <Search className={"bg-white md:w-[216px] w-[80vw]"} />
          </div>
          {/* 2nd */}
          <div className="md:h-[151px] h-auto bg-white shadow-md rounded-[30px] flex md:flex-row flex-col gap-10 md:gap-0 justify-around items-start px-5 md:p-0 py-10 md:items-center">
            <div className="h-[84px] w-[218px] flex justify-between items-center ">
              <img
                src={userIcon}
                className="bg-linear-to-br from-[#d3ffe7] to-[#effff6] rounded-full p-3
            "
              />
              <div className="flex h-full justify-between flex-col">
                <span className="font-normal text-[14px] leading-[100%] text-[#acacac]">
                  Total Customers
                </span>
                <span className="font-semibold text-[32px] leading-[100%] text-[#000]">
                  5,423
                </span>
                <span className="font-normal text-[12px] leading-[100%] text-[#292d32]">
                  <span className="text-green-600 font-bold">16%</span> this
                  month
                </span>
              </div>
            </div>
            <div className="h-[84px] w-[218px] flex justify-between items-center ">
              <img
                src={tick}
                className="bg-linear-to-br from-[#d3ffe7] to-[#effff6] rounded-full p-3
            "
              />
              <div className="flex h-full justify-between flex-col">
                <span className="font-normal text-[14px] leading-[100%] text-[#acacac]">
                  Members
                </span>
                <span className="font-semibold text-[32px] leading-[100%] text-[#000]">
                  1,893
                </span>
                <span className="font-normal text-[12px] leading-[100%] text-[#292d32]">
                  <span className="text-green-600 font-bold">1%</span>this month
                </span>
              </div>
            </div>
            <div className="h-[84px] w-[218px] flex justify-between items-center">
              <img
                src={monitor}
                className="bg-linear-to-br from-[#d3ffe7] to-[#effff6] rounded-full p-3
            "
              />
              <div className="flex h-full justify-between flex-col">
                <span className="font-normal text-[14px] leading-[100%] text-[#acacac]">
                  Active Now
                </span>
                <span className="font-semibold text-[32px] leading-[100%] text-[#000]">
                  189
                </span>
                <span className="font-normal text-[12px] h-3 leading-[100%] text-[#292d32]"></span>
              </div>
            </div>
          </div>
          {/* 3rd */}
          <div className="h-[812px] bg-white shadow-md rounded-[30px] p-8 pb-12 flex justify-between flex-col">
            <div className="flex justify-between flex-col md:flex-row gap-6 md:gap-0 items-start md:items-center h-[65px]">
              <div className="flex flex-col gap-2 items-start">
                <h2 className="font-semibold text-[22px] leading-[100%] text-[#000]">
                  All Customers
                </h2>
                <p className="font-normal text-[14px] h-3 leading-[100%] text-[#16c098]">
                  Active Members
                </p>
              </div>
              <div className="flex justify-between items-center gap-5">
                <Search className={"bg-[#FAFBFF] md:w-[216px] w-[100%]"} />
                <div className="relative">
                  <select className="md:pl-[3.5rem] p-2 bg-[#FAFBFF] md:w-[154px] w-full h-[38px] rounded-[12px] shadow-md focus:outline-none text-[12px] font-semibold ">
                    <option value="new">Newest</option>
                    <option value="trend">trending</option>
                  </select>
                  <span className="absolute font-light text-[#8c8f9d] text-[14px] md:block top-2 left-2 hidden ">
                    sort by
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{ scrollbarWidth: "none" }}
              className="overflow-x-auto h-[75%] mt-14 md:mt-0"
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="text-left text-[#B5B7C0] text-sm font-semibold">
                    <th className="font-medium text-[13px] leading-[100%] py-3">
                      Customer Name
                    </th>
                    <th className="font-medium text-[13px] leading-[100%] py-3">
                      Company
                    </th>
                    <th className="font-medium text-[13px] leading-[100%] py-3">
                      Phone Number
                    </th>
                    <th className="font-medium text-[13px] leading-[100%] py-3">
                      Email
                    </th>
                    <th className="font-medium text-[13px] leading-[100%] py-3">
                      Country
                    </th>
                    <th className="font-medium text-[13px] leading-[100%] py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.slice(0, 10).map((customer) => (
                    <tr
                      key={customer.id}
                      className="text-[#292D32] font-medium text-[12px] leading-[100%]"
                    >
                      <td className=" py-4 font-medium">
                        {customer.CustomerName}
                      </td>
                      <td className=" py-4">{customer.Company}</td>
                      <td className=" py-4 px-4 whitespace-nowrap">
                        {customer.PhoneNumber}
                      </td>
                      <td className=" py-4 px-4 whitespace-nowrap">
                        {customer.Email}
                      </td>
                      <td className=" py-4">{customer.Country}</td>
                      <td className=" py-4">
                        <span
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            customer.Status === "Active"
                              ? "border-[1px] border-[#00B087] bg-[#16C09861]/38  text-[#008767]"
                              : "border-[1px] border-[#DF0404] bg-[#FFC5C5]  text-[#DF0404]"
                          }`}
                        >
                          {customer.Status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row gap-3 pt-5 md:pt-0 md:gap-0 items-center justify-between">
              <span className="text-[14px] text-[#B5B7C0] font-medium leading-[100%]">
                Showing data 1 to 8 of 256K entries
              </span>
              <div className="flex items-center justify-center gap-1.5">
                <span className="bg-[#F5F5F5]  block text-center w-[25px] h-[24px] rounded-sm">
                  {"<"}
                </span>
                <span className="bg-[#5932EA] block text-center w-[25px] h-[24px] rounded-sm text-white">
                  1
                </span>
                <span className="bg-[#F5F5F5]  block text-center w-[25px] h-[24px] rounded-sm">
                  2
                </span>
                <span className="bg-[#F5F5F5]  block text-center w-[25px] h-[24px] rounded-sm">
                  3
                </span>
                <span className="bg-[#F5F5F5]  block text-center w-[25px] h-[24px] rounded-sm">
                  4
                </span>
                <span className="bg-[#F5F5F5]  block text-center w-[25px] h-[24px] rounded-sm">
                  ...
                </span>
                <span className="bg-[#F5F5F5]  block text-center w-[25px] h-[24px] rounded-sm">
                  40
                </span>
                <span className="bg-[#F5F5F5]  block text-center w-[25px] h-[24px] rounded-sm">
                  {">"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default MainBoard;
