import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Task1 } from "./Pages/Task1";
import { Task2a } from "./Pages/Task2a";
import { Task2b } from "./Pages/Task2b";
import { Task2c } from "./Pages/Task2c";
import { Task3 } from "./Pages/Task3";
import NavBar from "./Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task1" element={<Task1 />} />
        <Route path="/task2a" element={<Task2a />} />
        <Route path="/task2b" element={<Task2b />} />
        <Route path="/task2c" element={<Task2c />} />
        <Route path="/task3" element={<Task3 />} />
      </Routes>
    </>
  );
}

export default App;
