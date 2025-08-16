import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
import MultiStepForm from "./Pages/MultiStepForm";

=======
import TimeValidation from "./pages/TimeValidation";
import TransactionCard from "./pages/TransactionCard";
import BeneficiaryDetails from './pages/BeneficiaryDetails';
import LoanApplication from './pages/LoanApplication'; 
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
      <Route path="/multi-step" element={<MultiStepForm />} />{" "}
      {/* Added route */}
=======
      <Route path="/timevalidation" element={<TimeValidation />} />
      <Route path="/transaction" element={<TransactionCard />} />
      <Route path="/BeneficiaryDetails" element={<BeneficiaryDetails />} />
      <Route path="/loan-application" element={<LoanApplication />} /> 
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
    </Routes>
  );
}

export default App;
