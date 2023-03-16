import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import ChampionRotation from "./components/ChampionRotation";
import About from "./components/About";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="d-flex justify-content-center py-5">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/rotation" element={<ChampionRotation />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
