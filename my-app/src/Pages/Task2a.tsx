import React, { useState } from "react";
import "./Session.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import Cookies from "js-cookie";
import { app } from "../firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const Task2a = () => {
  const exp2text1 = "The quick brown fox jumps over the lazy dog";
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [keystrokeList, setKeyStrokeList] = useState<{}[]>([]);
  const db = getDatabase(app);
  const currentDate = new Date();
  const handleStartTask = () => {
    setClicked(true);
    const timestamp = currentDate.getTime();
    setStartTime(timestamp);
    setTimeout(() => {
      setEnabled(true);
      document.getElementById("task-input-field")!.focus();
    }, 2700);
  };

  const handleFinishTask = async () => {
    const userId = Cookies.get("keystroke-auth-research-tracking");
    const timestamp = currentDate.getTime();
    const keystrokeListRef = push(ref(db, "task2/taskA"));
    await set(keystrokeListRef, {
      user_id: userId,
      start_time: startTime,
      end_time: endTime,
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

    if (text === exp2text1) {
      const timestamp = currentDate.getTime();
      setEndTime(timestamp);
      setCompleted(true);
    }
  };

  return (
    <div className="main-panel">
      <div className={classNames("task-description", { clicked })}>
        <div className="task-header">
          <div className="task-title">
            Task 2: Typing a phrase
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
          {exp2text1}
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
        <NavLink to={"/task2b"} style={{ textDecoration: "none" }}>
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

export { Task2a };
