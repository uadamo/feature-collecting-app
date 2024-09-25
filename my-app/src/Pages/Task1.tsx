import React, { useState } from "react";
import "./Session.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Task1 = () => {
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [completed, setCompleted] = useState(false);
  const currentDate = new Date();
  const exp1text = "9pVBj4J0";
  const handleStartTask = () => {
    setClicked(true);
    const timestamp = currentDate.getTime();
    console.log(timestamp);
    setTimeout(() => {
      setEnabled(true);
      document.getElementById("task-input-field")!.focus();
    }, 2000);
  };

  const handleFinishTask = () => {
    const timestamp = currentDate.getTime();
    console.log(timestamp);
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
    console.log(keyUpInfo);
  };

  const handleTextValidationExp1 = () => {
    const text = (document.getElementById(
      "task-input-field"
    ) as HTMLInputElement)!.value;

    if (text === exp1text) {
      setCompleted(true);
      const timestamp = currentDate.getTime();
      console.log(timestamp);
    }
  };

  return (
    <div className="main-panel">
      <div className={classNames("task-description", { clicked })}>
        <div className="task-header">
          <div className="task-title">
            Task 1: Secure password
            <button className="info-button">?</button>
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
