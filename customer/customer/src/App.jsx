import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import MultiStepForm from "./Pages/MultiStepForm";
import TimeValidation from "./Pages/TimeValidation";
import TimeDepositApp from "./Pages/TimeDepositApp";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/multi-step" element={<MultiStepForm />} />{" "} */}
      <Route path="/timevalidation" element={<TimeValidation />} />{" "}
      <Route path="/timedeposit" element={<TimeDepositApp />} /> {" "}   {/* Added route */}
      {/* Added route */}
    </Routes>
  );
}

export default App;
