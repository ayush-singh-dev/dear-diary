import React from "react";
import hero from "../images/hero.jpg";
import { NavLink } from "react-router-dom";

const Home = () => {
  
  return (
    <div className=" relative">
      <div className=" w-full h-[90vh] overflow-hidden ">
        <img
          src={hero}
          alt="hero-image"
          className="   blur-[3px]  w-full min-h-screen  object-cover"
        />
      </div>
      <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h3 className=" text-xl lg:text-2xl font-bold mb-7 ">
          Your journal is like your best friend, you don’t have to pretend with
          it, you can be honest and write exactly how you feel
        </h3>
        <NavLink
          to={"/signUp"}
          className=" border rounded-xl px-6 py-3 text-white bg-purple-800 text-sm lg:text-lg"
        >
          Create New Account
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
