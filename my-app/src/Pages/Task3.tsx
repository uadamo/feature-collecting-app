import React, { useState } from "react";
import "./Session.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import Cookies from "js-cookie";
import { app } from "../firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const Task3 = () => {
  const [completed, setCompleted] = useState(false);
  const [keystrokeList, setKeyStrokeList] = useState<{}[]>([]);
  const db = getDatabase(app);
  const currentDate = new Date();
  const question1 =
    "The accuracy of a keystroke dynamics authentication system may be affected by one's mood and energy level," +
    " among other personal factors. " +
    "Describe your mood and energy level at the time of this session.";

  const handleFinishTask = async () => {
    const userId = Cookies.get("keystroke-auth-research-tracking");
    const timestamp = currentDate.getTime();
    const keystrokeListRef = push(ref(db, "task3"));
    await set(keystrokeListRef, {
      user_id: userId,
      keystroke_list: keystrokeList,
      timestamp: timestamp,
    }).catch((error) => alert(error));
  };

  const handleRegisterKeydown = (e: KeyboardEvent) => {
    const timestamp = currentDate.getTime();
    const keyDownInfo = {
      eventName: "keyDown",
      globalTimeStamp: timestamp,
      timestamp: e.timeStamp,
      key: e.key,
      code: e.code,
      location: e.location,
      detail: e.detail,
      shiftKey: e.shiftKey,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      altKey: e.altKey,
      type: e.type,
      repeated: e.repeat,
    };
    setKeyStrokeList((keystrokeList) => [...keystrokeList, keyDownInfo]);
  };

  const handleRegisterKeyup = (e: KeyboardEvent) => {
    const timestamp = currentDate.getTime();
    const keyUpInfo = {
      eventName: "keyUp",
      globalTimeStamp: timestamp,
      timestamp: e.timeStamp,
      key: e.key,
      code: e.code,
      location: e.location,
      detail: e.detail,
      shiftKey: e.shiftKey,
      ctrlKey: e.ctrlKey,
      metaKey: e.metaKey,
      altKey: e.altKey,
      type: e.type,
    };
    setKeyStrokeList((keystrokeList) => [...keystrokeList, keyUpInfo]);
  };

  const handleTextValidationExp1 = () => {
    const text = (document.getElementById(
      "task-input-field"
    ) as HTMLInputElement)!.value;

    if (text.length > 50) {
      setCompleted(true);
      const timestamp = currentDate.getTime();
      console.log(timestamp);
    }
  };

  return (
    <div className="main-panel">
      <div className={classNames("task-description")}>
        <div className="task-header">
          <div className="task-title">
            Task 3: Free typing
            <div className="tooltip">
              <button className={classNames("info-button")}>?</button>
              <span className="tooltiptext">
                No time trigger here - just type away! A button to finish the
                session will appear once you've hit the 50 character mark.
              </span>
            </div>
          </div>
          Reason an answer for this easy question in 50 characters or more
        </div>
      </div>
      <div className="task-content">
        {question1}
        <input
          className="task-input-field"
          id="task-input-field"
          type="text"
          name="name"
          required
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          //@ts-ignore
          onKeyDown={(event) => handleRegisterKeydown(event)}
          //@ts-ignore
          onKeyUp={(event) => handleRegisterKeyup(event)}
          onInput={handleTextValidationExp1}
        />
      </div>
      <NavLink to={"/"} style={{ textDecoration: "none" }}>
        <button
          className={classNames("next-task-button", { completed })}
          onClick={handleFinishTask}
        >
          Finish session
        </button>
      </NavLink>
    </div>
  );
};

export { Task3 };
