import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { app } from "./firebase";
import { getDatabase, ref, get, query, limitToFirst } from "firebase/database";
import Cookies from "js-cookie";

const Home = () => {
  const [user_session, setUser_session] = useState(0);
  const db = getDatabase(app);
  const userId = Cookies.get("keystroke-auth-research-tracking");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userRef = query(ref(db, `users/${userId}`), limitToFirst(1));
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const userObject = userSnapshot.val();
          setUser_session(userObject.session);
        }
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="home">
      <div className="info">
        <h3>Investigating keystroke dynamics - a research initiative</h3>
        <div>Select a session to begin</div>
      </div>

      <div className="sessions">
        <NavLink
          className={classNames("navbar-item", {
            enabled: user_session === 0,
          })}
          to="/task1"
        >
          <div className="session-tab">Session 1 </div>
        </NavLink>
        <NavLink
          className={classNames("navbar-item", {
            enabled: user_session === 1,
          })}
          to="/task1"
        >
          <div className="session-tab">Session 2 </div>
        </NavLink>
        <NavLink
          className={classNames("navbar-item", {
            enabled: user_session === 2,
          })}
          to="/task1"
        >
          <div className="session-tab">Session 3 </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
