import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MultiStepForm from "./Pages/MultiStepForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/multi-step" element={<MultiStepForm />} />{" "}
      {/* Added route */}
    </Routes>
  );
}

export default App;
