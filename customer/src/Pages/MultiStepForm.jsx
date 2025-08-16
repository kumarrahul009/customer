import React, { useState } from "react";
<<<<<<< HEAD
// import api from "../api"; // Adjust path

=======
import api from "../api"; // Adjust path
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    dob: "",
    gender: "",
    mobile: "",
    address1: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    question: "",
    answer: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // ---------- Frontend Validation ----------
  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.email || !formData.password) {
          setError("Please fill out email and password");
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("Enter a valid email");
          return false;
        }
        const passRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passRegex.test(formData.password)) {
          setError(
            "Password must be 8+ chars with uppercase, lowercase, number, and special character"
          );
          return false;
        }
        return true;

      case 2:
        if (!formData.full_name || !formData.dob || !formData.gender) {
          setError("Please fill all personal details");
          return false;
        }
        const age =
          new Date().getFullYear() - new Date(formData.dob).getFullYear();
        if (age < 18) {
          setError("You must be at least 18 years old");
          return false;
        }
        return true;

      case 3:
        if (!formData.mobile) {
          setError("Please enter your mobile number");
          return false;
        }
        if (!/^\d{10}$/.test(formData.mobile)) {
          setError("Mobile number must be 10 digits");
          return false;
        }
        return true;

      case 4:
        if (
          !formData.address1 ||
          !formData.city ||
          !formData.state ||
          !formData.postal ||
          !formData.country
        ) {
          setError("Please complete all address fields");
          return false;
        }
        return true;

      case 5:
        if (!formData.question || !formData.answer) {
          setError("Please select a question and provide an answer");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  // ---------- Next Step ----------
  const handleNext = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      switch (step) {
        case 1:
          await api.post("/step1", {
            email: formData.email,
            password: formData.password,
            agreed: true,
          });
          break;
        case 2:
          await api.post("/step2", {
            full_name: formData.full_name,
            dob: formData.dob,
            gender: formData.gender,
          });
          break;
        case 3:
          await api.post("/send-otp", { mobile: formData.mobile });
          break;
        case 4:
          await api.post("/address", {
            address1: formData.address1,
            city: formData.city,
            state: formData.state,
            postal: formData.postal,
            country: formData.country,
          });
          break;
        case 5:
          await api.post("/security", {
            question: formData.question,
            answer: formData.answer,
          });
          break;
        default:
          break;
      }
      setStep(step + 1);
    } catch (err) {
      setError(err.response?.data?.msg || "Error saving data");
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Step 1: Account Info</h2>
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <h2>Step 2: Personal Info</h2>
            <input
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
            />
            <input
              name="dob"
              type="date"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
            />
            <input
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </>
        );
      case 3:
        return (
          <>
            <h2>Step 3: Contact Info</h2>
            <input
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </>
        );
      case 4:
        return (
          <>
            <h2>Step 4: Address</h2>
            <input
              name="address1"
              placeholder="Address Line 1"
              value={formData.address1}
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            <input
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            <input
              name="postal"
              placeholder="Postal Code"
              value={formData.postal}
              onChange={handleChange}
            />
            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
            />
          </>
        );
      case 5:
        return (
          <>
            <h2>Step 5: Security Setup</h2>
            <input
              name="question"
              placeholder="Security Question"
              value={formData.question}
              onChange={handleChange}
            />
            <input
              name="answer"
              placeholder="Security Answer"
              value={formData.answer}
              onChange={handleChange}
            />
          </>
        );
      default:
        return <h2>All steps completed!</h2>;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {renderStep()}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Saving...</p>}

      <div style={{ marginTop: "20px" }}>
        {step > 1 && step < 6 && <button onClick={handlePrev}>Back</button>}
        {step < 5 && <button onClick={handleNext}>Next</button>}
        {step === 5 && (
          <button
            onClick={async () => {
              try {
                await api.post("/submit");
                alert("Form submitted successfully!");
              } catch (err) {
                setError(err.response?.data?.msg || "Error submitting form");
              }
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
