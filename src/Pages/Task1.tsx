import React, { useEffect, useState } from "react";
import "./Session.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { app } from "../firebase";
import {
  getDatabase,
  ref,
  set,
  push,
  query,
  limitToFirst,
  get,
} from "firebase/database";

const Task1 = () => {
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [iteration, setIteration] = useState(0);
  const [keystrokeList, setKeyStrokeList] = useState<{}[]>([]);
  const [reactionLatency, setReactionLatency] = useState(2000);
  const [userSession, setUserSession] = useState(0);
  const lodash = require("lodash");
  const currentDate = new Date();
  const exp1text = "Aqui3fodoS28";
  const userId = Cookies.get("keystroke-auth-research-tracking");
  const db = getDatabase(app);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = query(ref(db, `users/${userId}`), limitToFirst(1));
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const userObject = userSnapshot.val();
        setUserSession(userObject.session);
      }
    };
    fetchUser();
  }, [db, userId]);

  const handleStartTask = () => {
    setClicked(true);
    const timestamp = currentDate.getTime();
    setStartTime(timestamp);
    setTimeout(() => {
      setEnabled(true);
      document.getElementById("task-input-field")!.focus();
    }, reactionLatency);
  };

  const handleFinishTask = async () => {
    const keystrokeListRef = push(
      ref(db, `task1/user-${userId}/session-${userSession}`)
    );
    await set(keystrokeListRef, {
      iteration: iteration,
      reaction_latency: reactionLatency,
      start_time: startTime,
      end_time: currentDate.getTime(),
      keystroke_list: keystrokeList,
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
      timestamp: timestamp,
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
      handleFinishTask();
      setKeyStrokeList([]);
      setReactionLatency(lodash.random(2000, 6000));
      setCompleted(true);
    }
  };

  const handleContinue = () => {
    setCompleted(false);
    //setClicked(true);
    setEnabled(false);
    setIteration((iteration) => iteration + 1);
    (document.getElementById("task-input-field") as HTMLInputElement)!.value =
      "";
    handleStartTask();
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
                that is acceptable. Once the text has been typed in correctly 10
                times, a button leading to the next task will appear.
              </span>
            </div>
          </div>
          Start task, and begin typing the text as soon as it turns{" "}
          <b style={{ color: "red" }}>red</b>
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
          className={classNames("task-input-field", enabled)}
          id="task-input-field"
          type="text"
          name="name"
          autoComplete="off"
          autoCorrect="off"
          //@ts-ignore
          onKeyDown={(event) => handleRegisterKeydown(event)}
          //@ts-ignore
          onKeyUp={(event) => handleRegisterKeyup(event)}
          onInput={handleTextValidationExp1}
          onPaste={(e) => e.preventDefault()}
        />
      </div>
      <div className="next-task-button-holder">
        <div className="continue-task-panel">
          {iteration < 10 && (
            <div className="iteration-counter">{iteration}/10 attempts</div>
          )}
          {iteration < 10 && completed && (
            <button className="repeat-task-button" onClick={handleContinue}>
              Repeat task
            </button>
          )}
        </div>

        {completed && iteration >= 10 && (
          <NavLink to={"/task2a"} style={{ textDecoration: "none" }}>
            <button className="next-task-button" onClick={handleFinishTask}>
              Next task
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export { Task1 };
