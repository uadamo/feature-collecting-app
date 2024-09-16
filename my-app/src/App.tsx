import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Session1 } from "./Pages/Session1";
import { Session2 } from "./Pages/Session2";
import { Session3 } from "./Pages/Session3";
import NavBar from "./Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session1" element={<Session1 />} />
        <Route path="/session2" element={<Session2 />} />
        <Route path="/session3" element={<Session3 />} />
      </Routes>
    </>
  );
}

export default App;
