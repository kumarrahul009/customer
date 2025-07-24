import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login"); // Proceed without validation
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      {!showForm ? (
        <div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center min-h-[500px] flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4">Welcome to ABCD Bank</h3>
          <p className="text-gray-700 mb-2">
            Your journey to be ABCD starts here
          </p>
          <p className="text-gray-700 mb-2">Open your account in minutes</p>
          <p className="text-gray-700 mb-6">
            Our digital onboarding process is quick and paperless. Get started
            with these simple steps:
          </p>

          <div className="space-y-6 text-gray-800 text-center">
            <div>
              <h4 className="text-lg font-semibold">1. Create Your Account</h4>
              <p className="text-sm text-gray-600">
                Sign up with your email and mobile number.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">2. Verify Your Identity</h4>
              <p className="text-sm text-gray-600">
                Upload your documents and complete 2FA.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">3. Link Your Bank</h4>
              <p className="text-sm text-gray-600">
                Connect your existing accounts for easy access.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">4. Start Banking</h4>
              <p className="text-sm text-gray-600">
                Access your account and services instantly.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 border border-green-400 rounded bg-green-50 text-left text-sm text-gray-700">
            ✅ You’ll need a valid government ID <br />
            ⏱️ About 10 minutes to complete this process
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Get Started
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Create Your Account</h2>
            <span className="text-sm text-gray-500">Step 1/10</span>
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{" "}
              <span className="text-green-600 underline">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-green-600 underline">Privacy Policy</span>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
