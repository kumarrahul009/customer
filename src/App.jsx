import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TimeValidation from "./pages/TimeValidation";
import TransactionCard from "./pages/TransactionCard";
import BeneficiaryDetails from './pages/BeneficiaryDetails';
import LoanApplication from './pages/LoanApplication'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/timevalidation" element={<TimeValidation />} />
      <Route path="/transaction" element={<TransactionCard />} />
      <Route path="/BeneficiaryDetails" element={<BeneficiaryDetails />} />
      <Route path="/loan-application" element={<LoanApplication />} /> 
    </Routes>
  );
}

export default App;
