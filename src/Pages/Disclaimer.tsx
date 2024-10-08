import React, { SyntheticEvent, useState } from "react";
import Cookies from "js-cookie";
import "./Disclaimer.css";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const Disclaimer = () => {
  const [inputs, setInputs] = useState({ age: 20, gender: "female" });
  const navigate = useNavigate();
  const db = getDatabase(app);

  const handleChange = (event: {
    target: { name: string; value: number | string };
  }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    const userId = window.crypto.randomUUID();
    const userListRef = push(ref(db, `users/${userId}`));
    Cookies.set("keystroke-auth-research-tracking", userId, { expires: 365 });
    await set(userListRef, {
      user_id: userId,
      age: inputs.age,
      gender: inputs.gender,
      session: 0,
      nextSessionTime: 0,
    }).catch((error) => alert(error));
    navigate("/task1");
    window.location.reload();
  };

  return (
    <div className="main-panel">
      Disclaimer
      <div className="info-header">
        Thank you lots for participating in the research! Here are some
        guidelines and information.
      </div>
      <div className="info-text">
        This web application is intended to collect samples for a keystroke
        dynamics authentication system, which is a form of authentication based
        on the typing rhythm of a specific individual.
      </div>
      <div className="info-text">
        The keystroke data collected during this research will only be used for
        the purposes of this thesis. The data is pseudo-anonymous, meaning you
        will not be asked to provide details of your exact identity. The web
        application will grant your browser a cookie, which will serve as an
        identifier for upcoming sessions. Please don't clear this cookie,
        <i> keystroke-auth-research-tracking </i>, before you've finished the
        three sessions. <b>Make sure you aren't in incognito mode.</b>
      </div>
      <div className="info-text">
        The research will consist of three identical sessions, performed at a
        simiar time during the day. Therefore, please carry out all three
        sessions for data integrity. The sessions must be timed at least one day
        apart, and will be available 12:00 - 19:00 CEST.
      </div>
      <div className="info-text">
        When doing the instructed tasks, simply focus on typing once you click
        the button to begin the task - the input field will focus automatically.
        Once the correct text has been typed in, you'll be able to resume with a
        new task.
      </div>
      <div className="info-text-highlighted">
        To participate, you must have a QWERTY keyboard.
      </div>
      <div className="info-text-highlighted">
        By participating in the research, you agree that all the data collected
        during the sessions will be attributed to you and you only, and that you
        have thoroughly read this disclaimer.
      </div>
      <form onSubmit={(e) => submitForm(e)} className="identity-form">
        <label>
          Your age:
          <input
            required
            name="age"
            type="number"
            className="name-input"
            onChange={handleChange}
          ></input>
        </label>
        <label>
          You are:
          <select
            name="gender"
            defaultValue="female"
            className="select-input"
            onChange={handleChange}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </label>

        <button type="submit" className="submit-button">
          Agree and proceed
        </button>
      </form>
    </div>
  );
};

export { Disclaimer };
