import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import ChairPerson from "./components/ChairPerson";
import Voter from "./components/Voter";
import { Web3Provider } from "./context/Web3Context";

function App() {
  return (
    <Web3Provider>
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/chair-person/:id" element={<ChairPerson />} />
        <Route path="/voter/:id" element={<Voter />} />
      </Routes>
      </Router>
      </Web3Provider>
  );
}

export default App;
