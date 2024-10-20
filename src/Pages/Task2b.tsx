import React, { useEffect, useState } from "react";
import "./Session.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { app } from "../firebase";
import { getDatabase, ref, set, push, query, get } from "firebase/database";
type userValues = {
  user_id: string;
  age: number;
  gender: string;
  session: number;
  nextSessionTime: number;
};

type userObject = {
  [key: string]: userValues;
};
const Task2b = () => {
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [iteration, setIteration] = useState(1);
  const [keystrokeList, setKeyStrokeList] = useState<{}[]>([]);
  const [user, setUser] = useState<userObject>({});
  const [reactionLatency, setReactionLatency] = useState(2000);
  const lodash = require("lodash");
  const currentDate = new Date();
  const exp1text = "Pack my box with four dozen liquor jugs!";
  const userId = Cookies.get("keystroke-auth-research-tracking");
  const db = getDatabase(app);

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = query(ref(db, `users/${userId}`));
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const currentUser = userSnapshot.val();
        const key = Object.keys(currentUser)[0];
        setUser(currentUser[key]);
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
      ref(db, `task2b/user-${userId}/session-${user.session}`)
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
    if (e.key === "Enter" && completed && iteration < 10) {
      handleContinue();
      document.getElementById("task-input-field")!.blur();
    }
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
      setReactionLatency(lodash.random(2000, 7000));
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
            Task 3: Typing a phrase
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
          className={classNames("task-input-field", { enabled })}
          id="task-input-field"
          type="text"
          data-1p-ignore
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
          {iteration < 11 && (
            <div className="iteration-counter">{iteration}/10 attempts</div>
          )}
          {iteration < 10 && completed && (
            <button className="repeat-task-button" onClick={handleContinue}>
              Repeat task
            </button>
          )}
        </div>

        {completed && iteration >= 10 && (
          <NavLink to={"/task2c"} style={{ textDecoration: "none" }}>
            <button className="next-task-button" onClick={handleFinishTask}>
              Next task
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export { Task2b };
