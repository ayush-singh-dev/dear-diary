import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className=" bg-[#471C7E] p-14 mt-10 ">
        <div className=" w-full  flex justify-center gap-6 mb-6">
          <Link to="https://www.instagram.com/ayush777rawat/">
            <i className="fa-brands fa-instagram text-3xl hover:text-white"></i>
          </Link>
          <Link to="https://www.linkedin.com/in/ayush-singh-752b8524b?">
            {" "}
            <i className="fa-brands fa-linkedin-in text-3xl hover:text-white"></i>
          </Link>
          <Link to="https://github.com/ayush-singh-dev">
            <i className="fa-brands fa-github text-3xl hover:text-white"></i>
          </Link>
          <Link to="mailto:ayush777rawat@gmail.com">
            <i className="fa-regular fa-envelope text-3xl hover:text-white"></i>
          </Link>
        </div>
        <hr className="w-[85%] m-auto"></hr>
        <div className=" flex flex-col items-center mt-6 gap-2">
          <p className=" text-3xl font-semibold ">Dear Diary</p>
          <p>copyright &copy; 2024 Dear diary. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
