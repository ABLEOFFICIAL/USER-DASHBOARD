import React, { useContext, useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { UserContext } from "../context/UserContext";
import searchIcon from "../assets/IconSearch.png";
import userIcon from "../assets/profile-2user.png";
import tickIcon from "../assets/profile-tick.png";
import monitorIcon from "../assets/monitor.png";

const Search = ({ className }) => (
  <div className="relative">
    <input
      type="text"
      name="search"
      className={`h-[38px] rounded-[12px] pl-8 shadow-md focus:outline-none ${className}`}
    />
    <img src={searchIcon} alt="Search" className="absolute top-1/4 left-1.5" />
  </div>
);

const MainBoard = () => {
  const { loginEmail } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [customUser, setCustomUser] = useState(null);
  const [customers, setCustomers] = useState([]);

  // Handle user authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      console.log("User updated:", currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch customers and custom user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers
        const customerSnapshot = await getDocs(collection(db, "customers"));
        const customerData = customerSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerData);
        console.log("Customer data updated:", customerData);

        // Fetch custom user
        const userSnapshot = await getDocs(collection(db, "users"));
        const customUserData = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomUser(customUserData);
        console.log("Custom user data updated:", customUserData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Find real user
  const realUser = customUser?.find((person) => person.email === user?.email);

  if (!realUser) return null;

  return (
    <main
      style={{ scrollbarWidth: "none" }}
      className="h-screen overflow-x-hidden border-2 w-[100vw]"
    >
      <div className="mx-auto max-w-[968px] px-5 my-12 flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-5">
          <h1 className="text-2xl font-normal">
            Hello {realUser.fullName} 👋🏼,
          </h1>
          <Search className="w-[80vw] md:w-[216px] bg-white" />
        </div>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-around bg-white shadow-md rounded-[30px] p-5 md:p-0 md:h-[151px] md:items-center">
          {[
            {
              icon: userIcon,
              title: "Total Customers",
              value: "5,423",
              change: "16%",
              alt: "Users",
            },
            {
              icon: tickIcon,
              title: "Members",
              value: "1,893",
              change: "1%",
              alt: "Members",
            },
            {
              icon: monitorIcon,
              title: "Active Now",
              value: "189",
              alt: "Active",
            },
          ].map(({ icon, title, value, change, alt }) => (
            <div
              key={title}
              className="flex h-[84px] w-[218px] items-center gap-4"
            >
              <img
                src={icon}
                alt={alt}
                className="rounded-full p-3 bg-gradient-to-br from-[#d3ffe7] to-[#effff6]"
              />
              <div className="flex flex-col justify-between h-full">
                <span className="text-sm text-[#acacac]">{title}</span>
                <span className="text-3xl font-semibold text-black">
                  {value}
                </span>
                {change && (
                  <span className="text-xs text-[#292d32]">
                    <span className="font-bold text-green-600">{change}</span>{" "}
                    this month
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Customers Table Section */}
        <div className="flex flex-col justify-between bg-white shadow-md rounded-[30px] p-8 h-[812px]">
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-start md:items-center justify-between h-[65px]">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-black">
                All Customers
              </h2>
              <p className="text-sm text-[#16c098]">Active Members</p>
            </div>
            <div className="flex items-center gap-5 w-full md:w-auto">
              <Search className="bg-[#FAFBFF] w-full md:w-[216px]" />
              <div className="relative w-full md:w-[154px]">
                <select className="h-[38px] w-full rounded-[12px] bg-[#FAFBFF] p-2 pl-10 shadow-md focus:outline-none text-xs font-semibold">
                  <option value="new">Newest</option>
                  <option value="trend">Trending</option>
                </select>
                <span className="absolute top-2 left-2 text-sm text-[#8c8f9d] hidden md:block">
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
                <tr className="text-left text-sm text-[#B5B7C0] font-semibold">
                  {[
                    "Customer Name",
                    "Company",
                    "Phone Number",
                    "Email",
                    "Country",
                    "Status",
                  ].map((header) => (
                    <th key={header} className="py-3 text-[13px] font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.slice(0, 10).map((customer) => (
                  <tr
                    key={customer.id}
                    className="text-[#292D32] text-xs font-medium"
                  >
                    <td className="py-4">{customer.CustomerName}</td>
                    <td className="py-4">{customer.Company}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {customer.PhoneNumber}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {customer.Email}
                    </td>
                    <td className="py-4">{customer.Country}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          customer.Status === "Active"
                            ? "border border-[#00B087] bg-[#16C09861]/38 text-[#008767]"
                            : "border border-[#DF0404] bg-[#FFC5C5] text-[#DF0404]"
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

          <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-center justify-between pt-5 md:pt-0">
            <span className="text-sm text-[#B5B7C0] font-medium">
              Showing data 1 to 8 of 256K entries
            </span>
            <div className="flex items-center gap-1.5">
              {["<", "1", "2", "3", "4", "...", "40", ">"].map(
                (page, index) => (
                  <span
                    key={index}
                    className={`w-[25px] h-[24px] rounded-sm text-center ${
                      page === "1" ? "bg-[#5932EA] text-white" : "bg-[#F5F5F5]"
                    }`}
                  >
                    {page}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainBoard;
