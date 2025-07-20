import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import ChairPerson from "./components/ChairPerson";
import Voter from "./components/Voter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/chair-person" element={<ChairPerson />} />
        <Route path="/voter" element={<Voter />} />
      </Routes>
    </Router>
  );
}

export default App;
