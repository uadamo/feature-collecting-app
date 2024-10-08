import React, { useEffect, useState } from "react";
import "./Session.css";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import Cookies from "js-cookie";
import { app } from "../firebase";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  query,
  update,
} from "firebase/database";

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

const Task3 = () => {
  const [completed, setCompleted] = useState(false);
  const [keystrokeList, setKeyStrokeList] = useState<{}[]>([]);
  const [user, setUser] = useState<userObject>({});
  const [endTime, setEndTime] = useState(0);
  const navigate = useNavigate();
  const db = getDatabase(app);
  const userId = Cookies.get("keystroke-auth-research-tracking");
  const currentDate = new Date();
  const [key, setKey] = useState("");

  const question1 =
    "The accuracy of a keystroke dynamics authentication system may be affected by one's mood and energy level," +
    " among other personal factors. " +
    "Describe your mood and energy level at the time of this session. Alternatively, tell us about your day - the " +
    "objective is to get a feel of your regular typing rhythm.";

  useEffect(() => {
    const fetchUser = async () => {
      const userRef = query(ref(db, `users/${userId}`));
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const currentUser = userSnapshot.val();
        const key = Object.keys(currentUser)[0];
        setUser(currentUser[key]);
        setKey(key);
      }
    };
    fetchUser();
  }, [db, userId]);

  const handleFinishTask = async () => {
    const timestamp = currentDate.getTime();
    const keystrokeListRef = push(
      ref(db, `task3/user-${userId}/session-${user.session}`)
    );
    await set(keystrokeListRef, {
      keystroke_list: keystrokeList,
      end_time: endTime,
      timestamp: timestamp,
    }).catch((error) => alert(error));
    await update(ref(db, `users/${userId}/${key}`), {
      session: Number(user.session) + 1,
      nextSessionTime: timestamp + 3600000 * 24,
    }).catch((error) => alert(error));
    navigate("/");
    window.location.reload();
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

    if (text.length > 100) {
      setCompleted(true);
      const timestamp = currentDate.getTime();
      setEndTime(timestamp);
    }
  };

  return (
    <div className="main-panel">
      <div className={classNames("task-description")}>
        <div className="task-header">
          <div className="task-title">
            Task 5: Free typing
            <div className="tooltip">
              <button className={classNames("info-button")}>?</button>
              <span className="tooltiptext">
                No time trigger here - just type away! A button to finish the
                session will appear once you've hit the 100 character mark.
              </span>
            </div>
          </div>
          Reason an answer for this easy question in 100 characters or more.
        </div>
      </div>
      <div className="task-content">
        {question1}
        <input
          className={classNames("task-input-field", "enabled")}
          id="task-input-field"
          type="text"
          name="name"
          data-1p-ignore
          required
          autoFocus
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

      <button
        className={classNames("next-task-button")}
        onClick={handleFinishTask}
        disabled={!completed}
      >
        Finish session
      </button>
    </div>
  );
};

export { Task3 };
