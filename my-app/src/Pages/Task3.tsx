import React, { useState } from "react";
import "./Session.css";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const Task3 = () => {
  const [completed, setCompleted] = useState(false);
  const currentDate = new Date();
  const question1 =
    "Keystroke dynamics authentication is based on analysis of a subject's unique typing rhythm - with enough observation, " +
    "personal characteristics like levels of fatigue, cognitive patterns and even health conditions can be accurately estimated. Would you consider" +
    " this to potentially be a privacy risk, enough to make you opt out of using it? ";

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
          <div className="task-title">Task 3: Free typing</div>
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
