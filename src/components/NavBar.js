import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ searchHandler, searchQuery, setSearchQuery, inputField }) => {
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#f43f5e" : null,
    };
  };

  return (
    <nav className="navbar flex container mx-auto justify-between items-center py-8 flex-col md:flex-row text-center md:text-start gap-y-5 md:gap-y-0">
      <h2 className="text-2xl font-bold italic flex items-center lowercase">
        food<span className="text-rose-500">verse</span>
      </h2>
      <form action="" onSubmit={searchHandler}>
        <input
          ref={inputField}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          type="text"
          placeholder="search recipe..."
          className="p-3 px-8 md:w-96 rounded-full text-xl font-semibold placeholder:text-gray-400 bg-white/75 shadow-lg shadow-rose-100 focus:shadow-rose-200 outline-none duration-300"
        />
      </form>
      <ul className="links flex gap-3 justify-center items-center">
        <li>
          <NavLink
            style={navActive}
            end
            to={"/"}
            className="text-gray-400 hover:text-gray-600 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            style={navActive}
            end
            to={"/Favourites"}
            className="text-gray-400 hover:text-gray-600 duration-300"
          >
            Favourites
            <span className="favourites-count text-sky-400 font-bold">
              (10)
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
