import React, { useState } from "react";
import "./Session.css";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Session1 = () => {
  const [enabled, setEnabled] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [completed, setExp1Completed] = useState(false);
  const currentDate = new Date();
  const exp1text = "9pVBj4J0";
  //const exp2text1 = "The quick brown fox jumps over the lazy dog";
  //const exp2text2 = "Pack my box with four dozen liquor jugs";
  //const exp2text3 = "For doves love my big sphinx of quartz";
  const handleStartTask = () => {
    setClicked(true);
    const timestamp = currentDate.getTime();
    console.log(timestamp);
    setTimeout(() => {
      setEnabled(true);
      document.getElementById("session1-input-field")!.focus();
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
      "session1-input-field"
    ) as HTMLInputElement)!.value;

    if (text === exp1text) {
      setExp1Completed(true);
      const timestamp = currentDate.getTime();
      console.log(timestamp);
    }
  };

  return (
    <div className="main-panel">
      <div className={classNames("task-description", { clicked })}>
        <div className="task-header">
          Type in the text once it shows up on the screen
        </div>
        <button
          className={classNames("session-1-task-button")}
          onClick={handleStartTask}
        >
          Begin task
        </button>
      </div>
      <div className="task-content">
        <div className={classNames("session1-task-text", { enabled })}>
          {exp1text}
        </div>
        <input
          className="session1-input-field"
          id="session1-input-field"
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
      {/* enable button once text typed in correctly*/}
      <NavLink to={"/session2"} style={{ textDecoration: "none" }}>
        <button
          className={classNames("next-task-button", { completed })}
          onClick={handleFinishTask}
        >
          Next task
        </button>
      </NavLink>
    </div>
  );
};

export { Session1 };
