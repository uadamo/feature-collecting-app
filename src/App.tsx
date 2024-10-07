import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./Pages/About";
import { Task1 } from "./Pages/Task1";
import { Task2a } from "./Pages/Task2a";
import { Task2b } from "./Pages/Task2b";
import { Task2c } from "./Pages/Task2c";
import { Task3 } from "./Pages/Task3";
import NavBar from "./Navbar";
import { Disclaimer } from "./Pages/Disclaimer";
import Cookies from "js-cookie";

function App() {
  const userId = Cookies.get("keystroke-auth-research-tracking");
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route
          path="/task1"
          element={userId ? <Task1 /> : <Navigate to="/disclaimer" />}
        />
        <Route
          path="/task2a"
          element={userId ? <Task2a /> : <Navigate to="/disclaimer" />}
        />
        <Route
          path="/task2b"
          element={userId ? <Task2b /> : <Navigate to="/disclaimer" />}
        />
        <Route
          path="/task2c"
          element={userId ? <Task2c /> : <Navigate to="/disclaimer" />}
        />
        <Route
          path="/task3"
          element={userId ? <Task3 /> : <Navigate to="/disclaimer" />}
        />
      </Routes>
    </>
  );
}

export default App;
