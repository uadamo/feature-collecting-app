import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div>
        <div>Investigating keystroke dynamics - a research initiative</div>
        <div>Select a session to begin</div>
      </div>
      <NavLink className="navbar-item" to="/task1">
        <div className="session-tab">Session1 </div>
      </NavLink>

      <NavLink className="navbar-item" to="/task1">
        <div className="session-tab">Session2 </div>
      </NavLink>

      <NavLink className="navbar-item" to="/task1">
        <div className="session-tab">Session3 </div>
      </NavLink>
    </div>
  );
};

export default Home;
