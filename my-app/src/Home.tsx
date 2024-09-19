import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <NavLink className="navbar-item" to="/session1">
        <div className="session-tab">Session1 </div>
      </NavLink>

      <NavLink className="navbar-item" to="/session2">
        <div className="session-tab">Session2 </div>
      </NavLink>

      <NavLink className="navbar-item" to="/session3">
        <div className="session-tab">Session3 </div>
      </NavLink>
    </div>
  );
};

export default Home;
