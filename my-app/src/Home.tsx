import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const Home = () => {
  return (
    <div className="home">
      <div className="info">
        <h3>Investigating keystroke dynamics - a research initiative</h3>
        <div>Select a session to begin</div>
      </div>

      <div className="sessions">
        <NavLink className="navbar-item" to="/task1">
          <div className="session-tab">Session 1 </div>
        </NavLink>
        <NavLink className={classNames("navbar-item", "disabled")} to="/task1">
          <div className={classNames("session-tab", "disabled")}>
            Session 2{" "}
          </div>
        </NavLink>
        <NavLink className={classNames("navbar-item", "disabled")} to="/task1">
          <div className={classNames("session-tab", "disabled")}>
            Session 3{" "}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
