import React, { useState, useEffect } from "react";
import Sign from "../images/signIn.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../store/UserContext";
const SignIn = () => {
  const [loginResponse, setLoginResponse] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const{setAuthUser} = useAuth()
  const Navigate = useNavigate();

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
      const response = await fetch("https://dear-diary-server.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const res_data = await response.json();
      if (response.ok) {
        setUser({
          email: "",
          password: "",
        });
        Navigate("/allPost");
        localStorage.setItem("user-data", JSON.stringify(res_data));
        setAuthUser(res_data);
        setLoginResponse(res_data);
      } else {
        toast.error(res_data.msg || "fill credientials properly");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };
  useEffect(() => {
    if (loginResponse) {
      toast.success(loginResponse.msg || "Sign In successfully");
    }
  }, [loginResponse, Navigate]);

  return (
    <>
      <div className=" flex bg-white justify-center max-w-fit mt-10 m-auto  shadow-lg px-7">
        <div className=" hidden md:flex lg:w-[534px] md:w-[420px] ">
          <img src={Sign} alt="signIn image" className=" w-full h-[29em]" />
        </div>
        <div className="w-auto">
          <h1 className=" font-bold text-3xl mt-9">Welcome Back !!</h1>
          <p className=" mt-4 text-slate-400">
            hey,Welcome back to special space
          </p>
          <form onSubmit={handleSubmit}>
            <div className=" mt-7">
              <label
                htmlFor="email"
                className=" block text-lg font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                className="border border-gray-300 mt-3 ml-3 px-3 py-2 rounded-md shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
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
            <div>
              <label
                htmlFor="password"
                className=" block mt-4 text-lg font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                className="border border-gray-300 mt-3 ml-3 px-3 py-2 rounded-md shadow-sm focus:outline-none
                 focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full"
                type="password"
                placeholder="Your Password"
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
              Sign In
            </button>
            <p className=" mt-5 text-sm text-slate-400 ">
              Dont have an account ?
              <NavLink to={"/signUp"} className="text-[#7E30E1] pb-6 lg:pb-0">
                sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
