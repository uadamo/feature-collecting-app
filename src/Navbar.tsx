import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink className="navbar-item" to="/">
        Home
      </NavLink>
      <NavLink className="navbar-item" to="/about">
        About
      </NavLink>
      {/* 
      <NavLink className="navbar-item" to="/task1">
        Session1
      </NavLink>

      <NavLink className="navbar-item" to="/task1">
        Session2
      </NavLink>

      <NavLink className="navbar-item" to="/task1">
        Session3
      </NavLink> */}
    </div>
  );
};

export default NavBar;
