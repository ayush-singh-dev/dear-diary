import React, { useState } from "react";
import sign from "../images/signUp.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch("https://dear-diary-server.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await responce.json();
      if (responce.ok) {
        setUser({
          email: "",
          name: "",
          password: "",
        });
        navigate("/signIn");
        toast.success(res_data.msg || "Registration Soccessfull");
      } else {
        toast.error(res_data.msg || "Registration failed");
      }
    } catch (error) {
      alert("Registration failed: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className=" flex justify-center bg-white   max-w-fit m-auto mt-5 p-6 shadow-lg gap-3">
        <div className=" hidden md:flex">
          <img src={sign} alt="SignUp image" className=" lg:w-[32em] md:w-[25em]" />
        </div>
        <div className=" p-4">
          <h1 className=" font-bold text-3xl text-center">Sign Up !!</h1>
          <form onSubmit={handleSubmit}>
            <div className=" mt-7">
              <label
                htmlFor="email"
                className=" block text-lg font-medium text-gray-700"
              >
                Email:{" "}
              </label>
              <input
                className="border border-gray-300 mt-3 ml-3 px-3 py-2 rounded-md shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full "
                type="email"
                placeholder="type your email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInput}
                required
                autoComplete="off"
              />
            </div>
            <div className=" mt-7">
              <label
                htmlFor="username"
                className=" block text-lg font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                className="border border-gray-300 mt-3 ml-3 px-3 py-2 rounded-md shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full "
                type="userName"
                placeholder="Your Name"
                name="userName"
                id="userName"
                value={user.userName}
                onChange={handleInput}
                required
                autoComplete="off"
              />
            </div>
            <div className=" mt-7">
              <label
                htmlFor="Password"
                className=" block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                className="border border-gray-300 mt-3 ml-3 px-3 py-2 rounded-md shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full "
                type="password"
                placeholder="type your Password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInput}
                required
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className=" mt-8 bg-[#7E30E1] px-7 py-2 text-white rounded-lg"
            >
              Sign Up
            </button>
            <p className=" mt-5 text-sm text-slate-400 ">
              have an account ?
              <NavLink to={"/signIn"} className="text-[#7E30E1]">
                sign In
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
