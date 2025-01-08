import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PredictionForm from "./PredictionForm";
import PredictionForm1 from "./PredictionForm1";
import "./App.css";

const Navigation = () => (
  <nav className="navigation">
    <div className="nav-container">
      <ul className="nav-list">
        <li>
          <Link to="/loan" className="nav-link">
            Loan Approval Assessment
          </Link>
        </li>
        <li>
          <Link to="/individual" className="nav-link">
            Individual Credit Risk Assessment
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

const HomePage = () => (
  <div className="home-container">
    <h1>Welcome to Credit Assessment System</h1>
    <p>Please select one of the following options:</p>
    <div className="button-container">
      <Link to="/loan" className="home-button loan">
        Loan Approval Assessment
      </Link>
      <Link to="/individual" className="home-button individual">
        Individual Credit Risk Assessment
      </Link>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loan" element={<PredictionForm />} />
          <Route path="/individual" element={<PredictionForm1 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
