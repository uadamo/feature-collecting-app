import React, { useState } from "react";
import "./Session.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { app } from "../firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const Task1 = () => {
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [keystrokeList, setKeyStrokeList] = useState<{}[]>([]);
  const currentDate = new Date();
  const exp1text = "9pVBj4J0";
  const db = getDatabase(app);
  const handleStartTask = () => {
    setClicked(true);
    const timestamp = currentDate.getTime();
    setStartTime(timestamp);
    setTimeout(() => {
      setEnabled(true);
      document.getElementById("task-input-field")!.focus();
    }, 3500);
  };

  const handleFinishTask = async () => {
    const userId = Cookies.get("keystroke-auth-research-tracking");
    const timestamp = currentDate.getTime();
    const keystrokeListRef = push(ref(db, "task1"));
    await set(keystrokeListRef, {
      user_id: userId,
      start_time: startTime,
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
    console.log(keyDownInfo);
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

    if (text === exp1text) {
      setCompleted(true);
    }
  };

  return (
    <div className="main-panel">
      <div className={classNames("task-description", { clicked })}>
        <div className="task-header">
          <div className={classNames("task-title")}>
            Task 1: Secure password
            <div className="tooltip">
              <button className={classNames("info-button")}>?</button>
              <span className="tooltiptext">
                The input field will focus automatically once the colour changes
                - simply start typing then. Don't worry about making mistakes -
                that is acceptable. Once the text has been typed in correctly, a
                button leading to the next task will appear.
              </span>
            </div>
          </div>
          Start typing the text once it turns red
        </div>
        <button className={classNames("task-button")} onClick={handleStartTask}>
          Start task
        </button>
      </div>
      <div className="task-content">
        <div className={classNames("task-task-text", { enabled })}>
          {exp1text}
        </div>
        <input
          className="task-input-field"
          id="task-input-field"
          type="text"
          name="name"
          required
          autoComplete="off"
          autoCorrect="off"
          //@ts-ignore
          onKeyDown={(event) => handleRegisterKeydown(event)}
          //@ts-ignore
          onKeyUp={(event) => handleRegisterKeyup(event)}
          onInput={handleTextValidationExp1}
        />
      </div>
      <div className="next-task-button-holder">
        <NavLink to={"/task2a"} style={{ textDecoration: "none" }}>
          <button
            className={classNames("next-task-button", { completed })}
            onClick={handleFinishTask}
          >
            Next task
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export { Task1 };
