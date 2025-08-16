import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
import MultiStepForm from "./Pages/MultiStepForm";

=======
<<<<<<< HEAD
import MultiStepForm from "./Pages/MultiStepForm";

=======
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
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
<<<<<<< HEAD
      <Route path="/multi-step" element={<MultiStepForm />} />{" "}
      {/* Added route */}
=======
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
    </Routes>
  );
}

export default App;
