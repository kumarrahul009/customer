import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: welcome, 1: account, 2: personal, 3: contact
  


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [mobile, setMobile] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const [address1, setAddress1] = useState("");
const [address2, setAddress2] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [postal, setPostal] = useState("");
const [country, setCountry] = useState("");

const [idFile, setIdFile] = useState(null);
const [selfie, setSelfie] = useState(null);

const handleOpenCamera = () => {
  // Open webcam modal / route
  alert("Open camera here or implement live capture logic");
};

const [securityQuestion, setSecurityQuestion] = useState("");
const [securityAnswer, setSecurityAnswer] = useState("");


const [consent1, setConsent1] = useState(false);
const [consent2, setConsent2] = useState(false);
const [consent3, setConsent3] = useState(false);
const [consent4, setConsent4] = useState(false);






  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4 py-8">
      
      {step === 0 && (
<div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center">          
          <h3 className="text-xl font-bold mb-4">Welcome to ABCD Bank</h3>
          <p className="text-gray-700 mb-2">Your journey to be ABCD starts here</p>
          <p className="text-gray-700 mb-2">Open your account in minutes</p>
          <p className="text-gray-700 mb-6">
            Our digital onboarding process is quick and paperless. Get started with these simple steps:
          </p>

          <div className="space-y-6 text-gray-800 text-center">
            <div>
              <h4 className="text-lg font-semibold">1. Create Your Account</h4>
              <p className="text-sm text-gray-600">Sign up with your email and mobile number.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">2. Verify Your Identity</h4>
              <p className="text-sm text-gray-600">Upload your documents and complete 2FA.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">3. Link Your Bank</h4>
              <p className="text-sm text-gray-600">Connect your existing accounts for easy access.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold">4. Start Banking</h4>
              <p className="text-sm text-gray-600">Access your account and services instantly.</p>
            </div>
          </div>

          <div className="mt-6 p-4 border border-green-400 rounded bg-green-50 text-left text-sm text-gray-700">
            ✅ You’ll need a valid government ID <br />
            ⏱️ About 10 minutes to complete this process
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Get Started
          </button>
        </div>
      )}

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}
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
              <span className="text-green-600 underline">Terms & Conditions</span> and{" "}
              <span className="text-green-600 underline">Privacy Policy</span>
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(0)}
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

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(3);
          }}
          className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Personal Details</h2>
            <span className="text-sm text-gray-500">Step 2/10</span>
          </div>

          <div className="space-y-1">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <p className="text-xs text-gray-500">
              As it appears on your government‑issued ID.
            </p>
          </div>

          <input
            type="text"
            placeholder="DD/MM/YY"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-2"
              />
              Female
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
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

         {step === 3 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStep(4); // Move to next step
    }}
    className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
  >
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-xl font-semibold">Contact Information</h2>
      <span className="text-sm text-gray-500">Step 3/10</span>
    </div>

    {/* Email field (read-only) */}
    <div className="space-y-2">
      <label className="text-sm text-gray-700">Email Address</label>
      <input
        type="email"
        value={email}
        readOnly
        className="w-full p-2 border rounded bg-gray-100"
      />
    </div>

    {/* Mobile + Send OTP */}
    <div className="space-y-1">
      <label className="text-sm text-gray-700">Mobile Number</label>
      <div className="flex gap-2">
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter Mobile Number"
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Send OTP
        </button>
      </div>
    </div>

    {/* OTP Section */}
    <div className="mt-4 p-4 border border-blue-300 rounded bg-blue-50">
      <p className="text-sm font-semibold mb-2 text-blue-800">OTP Verification Center</p>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter OTP"
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
        >
          Verify OTP
        </button>
      </div>
      <button
        type="button"
        className="text-sm text-blue-600 hover:underline"
      >
        Resend OTP
      </button>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between pt-4">
      <button
        type="button"
        onClick={() => setStep(2)}
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
{step === 4 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStep(5); // You can add manual validation here if needed
    }}
    className="w-full max-w-2xl"
  >
    <div className="border border-gray-300 rounded p-6 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Address Details</h2>
        <span className="text-sm text-gray-500">Step 4/10</span>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Address Line 1</label>
        <input
          type="text"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          placeholder="Enter address line 1"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">
          Address Line 2 <span className="text-gray-400">(Optional)</span>
        </label>
        <input
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          placeholder="Enter address line 2"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">State/Province</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Postal Code</label>
          <input
            type="text"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setStep(3)}
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
    </div>
  </form>
)}

   {step === 5 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStep(6); // Move to next step
    }}
    className="w-full max-w-2xl"
  >
    <div className="border border-gray-300 rounded p-6 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Identity Verification</h2>
        <span className="text-sm text-gray-500">Step 5/10</span>
      </div>

      {/* Instructional Text */}
      <p className="text-sm text-gray-700 mb-6">
        To comply with ABCD Bank regulation and protect your account, we need to verify your identity like bank websites or government ID portals.
      </p>

      {/* ID Upload Split into Two Boxes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Government ID</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Left Box */}
          <div className="border border-gray-300 rounded p-6 text-center text-gray-700 hover:bg-gray-50 cursor-pointer">
            <p>Drag and drop your ID here</p>
            <p className="mt-2 text-sm text-gray-400">or</p>
            <a
              href="#"
              className="text-blue-500 underline text-sm"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("idUpload").click();
              }}
            >
              Browse files
            </a>
          </div>

          {/* Right Box */}
          <div
            onClick={() => document.getElementById("idUpload").click()}
            className="border-2 border-dashed border-gray-300 rounded p-6 text-center text-gray-400 hover:border-blue-400 cursor-pointer"
          >
            Drop file here
          </div>
        </div>

        <input
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          id="idUpload"
          onChange={(e) => setIdFile(e.target.files[0])}
        />
      </div>

      {/* Upload or Take a Selfie */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload or Take a Selfie</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => document.getElementById("selfieUpload").click()}
            className="w-full border p-3 rounded text-gray-700 hover:bg-gray-100"
          >
            Upload Your Photo
          </button>
          <button
            type="button"
            onClick={handleOpenCamera}
            className="w-full border p-3 rounded text-gray-700 hover:bg-gray-100"
          >
            Use Camera
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          id="selfieUpload"
          className="hidden"
          onChange={(e) => setSelfie(e.target.files[0])}
        />
      </div>

      {/* Security Info */}
      <div className="bg-gray-50 p-4 border border-gray-200 rounded text-sm text-gray-600 mb-6">
        Your data is encrypted and securely stored. We do not share it with third-party sites without your consent.
      </div>

      {/* Back & Continue Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(4)}
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
    </div>
  </form>
)}

{step === 6 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStep(7); // Go to next step
    }}
    className="w-full max-w-2xl"
  >
    <div className="border border-gray-300 rounded p-6 shadow-sm bg-white relative text-center">
      {/* Step label inside the card - top right */}
      <div className="absolute top-4 right-4 text-sm text-gray-500">Step 6/10</div>

      {/* Header */}
      <h2 className="text-xl font-semibold mb-2">Security Setup</h2>
      <p className="text-sm text-gray-700 mb-6">
        Enhance your account security with these additional measures.
      </p>

      {/* 2FA Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Two-Factor Authentication (2FA)</h3>
        <p className="text-sm text-gray-600 mb-3">
          Receive a code on your mobile device each time you login.
        </p>

        {/* Why 2FA */}
        <div className="bg-gray-50 border border-gray-200 rounded p-4 text-sm text-gray-600 mb-6">
          <strong className="block font-medium text-gray-800 mb-1">Why We Use 2FA</strong>
          Two-factor authentication adds an extra layer of security to your account. Even if someone knows your password, they won’t be able to access your account without the verification code sent to your mobile device.
        </div>
      </div>

      {/* Security Question Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Security Questions</h3>
        <p className="text-sm text-gray-600 mb-4">
          Set up a security question to help verify your identity if you need to recover your account.
        </p>

        <select
          value={securityQuestion}
          onChange={(e) => setSecurityQuestion(e.target.value)}
          className="w-full p-2 border rounded mb-4 text-sm"
        >
          <option value="">Select a security question</option>
          <option value="pet">What is the name of your first pet?</option>
          <option value="school">What was your primary school's name?</option>
          <option value="city">In what city were you born?</option>
          <option value="nickname">What was your childhood nickname?</option>
        </select>

        <input
          type="text"
          value={securityAnswer}
          onChange={(e) => setSecurityAnswer(e.target.value)}
          placeholder="Your answer"
          className="w-full p-2 border rounded text-sm"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={() => setStep(5)}
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
    </div>
  </form>
)}

{step === 7 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStep(8); // Go to next step
    }}
    className="w-full max-w-2xl"
  >
    <div className="border border-gray-300 rounded p-6 shadow-sm bg-white relative text-center">
      {/* Step Label */}
      <div className="absolute top-4 right-4 text-sm text-gray-500">Step 7/10</div>

      {/* Card Header */}
      <h2 className="text-xl font-semibold mb-2">TERMS & CONSENT</h2>
      <p className="text-sm text-gray-700 mb-6">
        Please review and accept our terms and conditions to continue.
      </p>

      {/* Terms Content Scroll Box */}
      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-4 bg-gray-50 text-sm text-gray-700 mb-6 space-y-4 text-center">
        <p className="text-xs italic text-gray-500 text-right">Last Updated: July 2025</p>

         <div>
          <strong>Welcome to ABCD Bank</strong><br /> by creating an account, you agree to the following Terms and Conditions:
        </div>

        <div>
          <strong>1. Account Usage</strong><br />
          You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          You agree to notify ABCD Bank immediately of any unauthorized use of your account or any breach of security.
        </div>

        <div>
          <strong>2. Privacy Policy</strong><br />
          Your use of Secure Branch services is subject to our Privacy Policy, which governs our use and disclosure of your personal information.
          By using our services, you consent to the collection and use of this information as described in the Privacy Policy.
        </div>

        <div>
          <strong>3. Electronic Communications</strong><br />
          When you use ABCD Bank services or send emails to us, you are communicating with us electronically.
          You consent to receive communications from us electronically. We will communicate with you by email or by posting notices on our website or mobile applications.
        </div>

        <div>
          <strong>4. Fees and Charges</strong><br />
          You agree to pay all fees and charges associated with your account as outlined in our fee schedule.
          We reserve the right to change fees and charges at any time with notice as required by applicable law.
        </div>

        <div>
          <strong>5. Termination</strong><br />
          We reserve the right to terminate your account at any time for any reason, including but not limited to violation of the Terms & Conditions.
        </div>
      </div>

      {/* Consent Checkboxes */}
      <div className="space-y-3 text-sm text-gray-700 mb-6 text-left">
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={consent1}
            onChange={(e) => setConsent1(e.target.checked)}
            className="mt-1"
          />
          <span>I have read and agree to the Terms and Conditions.</span>
        </label>

        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={consent2}
            onChange={(e) => setConsent2(e.target.checked)}
            className="mt-1"
          />
          <span>I have read and agree to the Privacy Policy.</span>
        </label>

        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={consent3}
            onChange={(e) => setConsent3(e.target.checked)}
            className="mt-1"
          />
          <span>
            I consent to receive electronic communications from ABCD Bank including account statements, notices, and marketing communication.
          </span>
        </label>

        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={consent4}
            onChange={(e) => setConsent4(e.target.checked)}
            className="mt-1"
          />
          <span>I confirm that the information I provide is accurate and correct.</span>
        </label>
      </div>

      {/* Back and Continue Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setStep(6)}
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
    </div>
  </form>
)}













  




     

      
    </div>
  );
};

export default Register;
