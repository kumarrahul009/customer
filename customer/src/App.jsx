import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
import MultiStepForm from "./Pages/MultiStepForm";

=======
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
      <Route path="/multi-step" element={<MultiStepForm />} />{" "}
      {/* Added route */}
=======
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
    </Routes>
  );
}

export default App;
