import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/UserContext";

const Navbar = () => {
  const { logout, authUser, isLoggedIn } = useAuth();

  // const userAuth = authUser;
  return (
    <>
      <header className=" flex justify-between px-4 py-5 md:px-16 md:py-5 ">
        {isLoggedIn ? (
          <div>
            <NavLink to={"/allPost"} className=" text-[1.3rem] md:text-xl">
              Dear Diary
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to={"/"} className=" text-[1.3rem] md:text-xl">
              Dear Diary
            </NavLink>
          </div>
        )}

        <div>
          <ul className=" flex gap-5 lg:gap-8">
            {isLoggedIn && (
              <>
                <li>
                  <NavLink
                    to={"/createPost"}
                    className=" bg-[#7E30E1] text-white md:px-5 px-[0.57rem] py-2 rounded-md font-bold text-sm lg:text-lg"
                  >
                    create New Post
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={logout}
                    to={"/"}
                    className=" bg-[#7E30E1] text-white md:px-5 px-[0.57rem] py-2 rounded-md font-bold text-sm lg:text-lg"
                  >
                    log out
                  </NavLink>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink
                    to={"/signIn"}
                    className=" bg-[#7E30E1] text-white px-5 py-2 rounded-md font-bold text-sm lg:text-lg"
                  >
                    sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/signUp"}
                    className=" bg-[#7E30E1] text-white px-5 py-2 rounded-md font-bold text-sm lg:text-lg"
                  >
                    sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
