import React, { useEffect, useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { app } from "./firebase";
import { getDatabase, ref, get, query, remove } from "firebase/database";
import Cookies from "js-cookie";
import moment from "moment";

const Home = () => {
  const [user_session, setUser_session] = useState(0);
  const [next_session_time, setNext_session_time] = useState(0);
  const db = getDatabase(app);
  const userId = Cookies.get("keystroke-auth-research-tracking");
  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  const fetchUser = async () => {
    const userRef = query(ref(db, `users/${userId}`));
    const userSnapshot = await get(userRef);
    if (userSnapshot.exists()) {
      const currentUser = userSnapshot.val();
      const key = Object.keys(currentUser)[0];
      setUser_session(currentUser[key].session);
      setNext_session_time(currentUser[key].nextSessionTime);
      console.log(currentUser);
      console.log(currentUser[key]);
    }
  };
  fetchUser();

  return (
    <div className="home">
      <div className="info">
        <h3>Investigating keystroke dynamics - a research initiative</h3>
        <div>Select a session to begin</div>
        {(moment(currentTime).get("hours") >= 19 ||
          moment(currentTime).get("hours") < 12) && (
          <div>Sessions are open between 12:00 and 19:00 CEST</div>
        )}
      </div>

      <div className="sessions">
        <NavLink
          className={classNames("session-tab", {
            enabled:
              user_session === 0 &&
              moment(currentTime).get("hours") >= 12 &&
              moment(currentTime).get("hours") < 19,
          })}
          to="/task1"
        >
          <div>
            {user_session === 0 && <div>Session 1 </div>}
            {user_session > 0 && (
              <div>
                <div className="session-completed">
                  You have completed this session
                </div>
              </div>
            )}
          </div>
        </NavLink>
        <NavLink
          className={classNames("session-tab", {
            enabled:
              user_session === 1 &&
              next_session_time < currentTime &&
              moment(currentTime).get("hours") >= 12 &&
              moment(currentTime).get("hours") < 19,
          })}
          to="/task1"
        >
          {user_session <= 1 && <div>Session 2 </div>}
          {user_session === 1 && next_session_time > currentTime && (
            <div>
              The session opens at{" "}
              {moment(next_session_time).format("yyyy/MM/DD HH:mm:ss")}
            </div>
          )}
          {user_session > 1 && (
            <div>
              <div>You have completed this session</div>
            </div>
          )}
        </NavLink>
        <NavLink
          className={classNames("session-tab", {
            enabled:
              user_session === 2 &&
              next_session_time < currentTime &&
              moment(currentTime).get("hours") >= 12 &&
              moment(currentTime).get("hours") < 19,
          })}
          to="/task1"
        >
          {user_session <= 2 && <div>Session 3 </div>}
          {user_session === 2 && next_session_time > currentTime && (
            <div>{moment(next_session_time).format("yyyy/MM/DD HH:mm:ss")}</div>
          )}
          {user_session > 2 && (
            <div>
              <div className="session-completed">
                You have completed this session
              </div>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
