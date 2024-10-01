import React, { SyntheticEvent, useState } from "react";
import Cookies from "js-cookie";
import "./Disclaimer.css";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getDatabase, ref, set, push } from "firebase/database";

const Disclaimer = () => {
  const [inputs, setInputs] = useState({ age: 20, gender: "female" });
  const navigate = useNavigate();

  const handleChange = (event: {
    target: { name: string; value: number | string };
  }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    const db = getDatabase(app);
    const userListRef = push(ref(db, "users"));
    const userId = window.crypto.randomUUID();
    Cookies.set("keystroke-auth-research-tracking", userId, { expires: 365 });
    await set(userListRef, {
      user_id: userId,
      age: inputs.age,
      gender: inputs.gender,
    })
      .then(() => alert("You may begin the first session!"))
      .catch((error) => alert(error));
    const sessionListRef = push(ref(db, "sessions"));
    await set(sessionListRef, {
      user_id: userId,
      session1: 1,
      session2: 0,
      session3: 0,
    })
      .then(() => alert("You may begin the first session!"))
      .catch((error) => alert(error));
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
        identifier for upcoming sessions. Please don't clear your cookies during
        this research.
      </div>
      <div className="info-text">
        The research will consist of three identical sessions, performed at a
        simiar time during the day. Therefore, please carry out all three
        sessions for data integrity.
      </div>
      <div className="info-text">
        When doing the instructed tasks, simply focus on typing once you click
        the button to begin the task - the input field will focus automatically
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
