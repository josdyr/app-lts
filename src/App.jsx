import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TeslaCars from "./TeslaCars";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/tesla-cars" element={<TeslaCars />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
