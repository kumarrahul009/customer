import React, { useState } from "react";
import { useRef } from "react";

import { useNavigate } from "react-router-dom";


import uploadIdIcon from "../assets/imges/img.png";
import DragDropIcon from "../assets/imges/Drop&Drag.png";
import photoUploadIcon from "../assets/imges/camera.svg";
import cameraIcon from "../assets/imges/upload.svg";
import editIcon from "../assets/imges/Edit.png";
import tick from "../assets/imges/tick.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  

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

  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consent3, setConsent3] = useState(false);
  const [consent4, setConsent4] = useState(false);

  const [phone, setPhone] = useState("");      // for Step 8 review
   const [address, setAddress] = useState("");  // for Step 8 review


  
const otpRefs = useRef([]);

const handleOTPChange = (e, index) => {
  const value = e.target.value;
  if (/^\d$/.test(value)) {
    if (index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  }
};

const handleOTPKeyDown = (e, index) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
  if (e.key === "Backspace" && !e.target.value && index > 0) {
    otpRefs.current[index - 1]?.focus();
  }
};

const verifyOTP = () => {
  const otp = otpRefs.current.map((input) => input.value).join("");
  if (otp.length === 6) {
    setStep(4); // Go to next step
  } else {
    alert("Please enter all 6 digits");
  }
};
     


  const totalSteps = 10;


  const handleOpenCamera = () => {
    alert("Open camera here or implement live capture logic");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex flex-col items-center justify-center px-4 py-8">
      {step === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full border border-emerald-200 text-center">
          <h3 className="text-xl font-bold text-blue-600 mb-4">
            Welcome to <span className="text-blue-800">ABCD Bank</span>
          </h3>
          <p className="text-gray-700 mb-2">Your journey to ABCD bank starts here</p>
          <p className="text-gray-700 mb-2">Open your account in minutes</p>
          <p className="text-gray-700 mb-6">
            Our digital onboarding process is quick and paperless. Get started with these simple steps:
          </p>

          <div className="space-y-6 text-gray-800 text-left">
            <div>
              <h4 className="text-lg font-semibold text-emerald-800">1. Create Your Account</h4>
              <p className="text-sm text-gray-600">Sign up with your email and mobile number.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-emerald-800">2. Verify Your Identity</h4>
              <p className="text-sm text-gray-600">Upload your documents and complete 2FA.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-emerald-800">3. Link Your Bank</h4>
              <p className="text-sm text-gray-600">Connect your existing accounts for easy access.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-emerald-800">4. Start Banking</h4>
              <p className="text-sm text-gray-600">Access your account and services instantly.</p>
            </div>
          </div>

          <div className="mt-6 p-4 border border-emerald-300 rounded bg-emerald-50 text-left text-sm text-emerald-800">
            ✅ You’ll need a valid government ID <br /> ⏱️ About 10 minutes to complete this process
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-6 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 shadow"
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
    className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full border border-emerald-100"
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-blue-800">Create Your Account</h2>
      <span className="text-sm text-gray-400">Step {step} / {totalSteps}</span>
    </div>

    <div className="h-2 bg-gray-100 rounded-full mb-6">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
        style={{ width: `${(step / 10) * 100}%` }}
      />
    </div>

    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
      <input
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
  <div className="relative">
    <input
      type="password"
      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    
    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m0-10a3 3 0 00-3 3v2a3 3 0 006 0V10a3 3 0 00-3-3z"
        />
        <rect
          x="5"
          y="10"
          width="14"
          height="10"
          rx="2"
          ry="2"
          stroke="black"
          fill="white"
        />
      </svg>
    </div>
  </div>
</div>


    <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
  <input
    type="password"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
  <div className="mt-2 text-xs text-gray-600">
    <p className="font-medium mb-1">Password must contain:</p>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 ml-4">
      <p>• At least 8 characters</p>
      <p>• One uppercase letter</p>
      <p>• One number</p>
      <p>• One special character</p>
    </div>
  </div>
</div>


    <div className="mb-4 flex items-start">
      <input
        id="terms"
        type="checkbox"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        className="mt-1 mr-2"
      />
      <label htmlFor="terms" className="text-sm text-gray-700">
        I agree to the <a href="#" className="text-emerald-600 underline hover:text-emerald-700">Terms & Conditions</a>
      </label>
    </div>

    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={() => setStep(step - 1)}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
      >
        Back
      </button>
      <button
        type="submit"
        className="bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700 shadow-md"
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
          className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full border border-emerald-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-extrabold text-blue-800">Personal Details</h2>
            <span className="text-sm text-gray-500">Step {step} / {totalSteps}</span>
          </div>

          {/* <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 font-medium px-1 mb-1">
              <span>Account</span>
              <span>Personal</span>
              <span>Contact</span>
              <span>Finish</span>
            </div>
            <div className="flex space-x-2 mb-4">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full ${i < step ? "bg-emerald-600" : "bg-gray-300"}`}
                ></div>
              ))}
            </div>
          </div> */}
           <div className="h-2 bg-gray-200 rounded-full mb-6">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
        style={{ width: `${(step / 10) * 100}%` }}
      />
    </div>

          <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
  <input
    type="text"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
    placeholder="Enter your full name"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
  />
  <p className="text-xs text-gray-500 mt-1">As it appears on your ID document</p>
</div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={dob}

              onChange={(e) => setDob(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">You must be at leas 18 years old</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Gender</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-emerald-600 text-white py-2 px-6 rounded hover:bg-emerald-700 shadow"
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
      setStep(4);
    }}
    className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full border border-emerald-200"
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-extrabold text-blue-800">Contact Information</h2>
      <span className="text-sm text-gray-500">Step 3 / 10</span>
    </div>

    <div className="h-2 bg-gray-200 rounded-full mb-6">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
        style={{ width: `${(step / 10) * 100}%` }}
      />
    </div>

    {/* Email input */}
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">Email Address</label>
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email Address"
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded bg-white"
        />
        {email.includes("@") && (
          <span className="absolute right-3 top-2.5 bg-green-100 border border-green-500 rounded-full p-1">
            <img src={tick} alt="tick icon" className="w-4 h-4" />
          </span>
        )}
      </div>
      {email.includes("@") && (
        <p className="text-xs text-green-600 mt-1">Email verified</p>
      )}
    </div>

    {/* Mobile Number input */}
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">Mobile Number</label>
      <div className="flex gap-2">
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Mobile Number"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Send OTP
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number</p>
    </div>

    {/* OTP Verification */}
    <div className="mb-4 p-4 border border-blue-300 rounded bg-blue-50">
      <p className="text-sm font-semibold mb-2 text-blue-800">OTP Verification</p>

      <div className="flex items-center gap-2 flex-wrap">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            ref={(el) => (otpRefs.current[index] = el)}
            onChange={(e) => handleOTPChange(e, index)}
            onKeyDown={(e) => handleOTPKeyDown(e, index)}
            className="w-10 h-10 text-center border border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline ml-auto"
        >
          Resend OTP
        </button>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={verifyOTP}
          className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
        >
          Verify OTP
        </button>
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={() => setStep(2)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Back
      </button>
      <button
        type="submit"
        className="bg-emerald-600 text-white py-2 px-6 rounded hover:bg-emerald-700 shadow"
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
      setStep(5);
    }}
    className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full border border-emerald-200"
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-extrabold text-blue-800">Address Details</h2>
      <span className="text-sm text-gray-500">Step 4 / 10</span>
    </div>

    <div className="h-2 bg-gray-200 rounded-full mb-6">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-300"
        style={{ width: `${(step / 10) * 100}%` }}
      />
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700 mb-1"> Permanent Address </label>
        <textarea
           rows={3}
           value={address1}
            onChange={(e) => setAddress1(e.target.value)}
             placeholder="Permanent Address"
             className="w-full px-4 py-2 border border-gray-300 rounded resize-none"
             />

           </div>

           

         <div>
        <label className="block text-sm text-gray-700 mb-1">
          Residence address <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea 
          rows={3}
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          placeholder="Residence address"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div> 

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Select City</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">State/Province</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Select State</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Postal Code</label>
          <input
            type="text"
            value={postal}
            placeholder="Postal code"
            onChange={(e) => setPostal(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
          </select>
        </div>
      </div>
    </div>

    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={() => setStep(3)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Back
      </button>
      <button
        type="submit"
        className="bg-emerald-600 text-white py-2 px-6 rounded hover:bg-emerald-700 shadow"
      >
        Continue
      </button>
    </div>
  </form>
)}

{step === 5 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStep(6);
    }}
    className="w-125 max-w-2xl"
  >
    <div className="border border-gray-300 rounded-2xl p-6 shadow-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-extrabold text-blue-800">Identity Verification</h2>
        <span className="text-sm text-gray-500">Step 5/10</span>
      </div>

      <div className="h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${(step / 10) * 100}%` }}
        />
      </div>

      <p className="text-sm text-gray-700 mb-6">
        To comply with ABCD Bank regulation and protect your account, we need to verify your identity using a government-issued ID and a selfie.
      </p>

      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Upload Government ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Government ID</label>
            <div className="border border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50">
              <img src={uploadIdIcon} alt="Upload ID Icon" className="mx-auto w-10 h-10 mb-2" />
              <button
                type="button"
                onClick={() => document.getElementById("cameraUploadID").click()}
                className="bg-blue-100 text-blue-700 font-medium py-1.5 px-4 rounded hover:bg-blue-200 transition"
              >
                Browser File
              </button>
            </div>
          </div>

          {/* Live Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Live Photo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400">
              <img src={DragDropIcon} alt="Drag & Drop Icon" className="mx-auto w-10 h-10 mb-4" />
              <div className="flex flex-col gap-3 items-center">
                <button
                  type="button"
                  onClick={() => document.getElementById("cameraUploadSelfie").click()}
                  className="bg-blue-100 text-blue-700 font-medium py-1.5 px-4 rounded hover:bg-blue-200 transition w-full"
                >
                  Use Camera
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("fileUpload").click()}
                  className="bg-blue-100 text-blue-700 font-medium py-1.5 px-4 rounded hover:bg-blue-200 transition w-full"
                >
                  Browse Files
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Inputs */}
        {/* Rear camera for ID */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          id="cameraUploadID"
          onChange={(e) => setIdFile(e.target.files[0])}
        />

        {/* Front camera for selfie */}
        <input
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          id="cameraUploadSelfie"
          onChange={(e) => setIdFile(e.target.files[0])}
        />

        {/* Browse file input */}
        <input
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          id="fileUpload"
          onChange={(e) => setIdFile(e.target.files[0])}
        />

        {/* Show selected file name */}
        {idFile && (
          <p className="text-sm text-green-600 mt-2">Selected: {idFile.name}</p>
        )}
      </div>

      <div className="bg-emerald-50 p-4 border border-gray-200 rounded-lg text-sm text-gray-600 mb-6">
        Your data is encrypted and securely stored. We do not share it with third-party sites without your consent.
      </div>

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
      setStep(7); 
    }}
    className="w-125 max-w-2xl"
  >
    <div className="border border-gray-300 rounded-2xl rounded p-6 shadow-sm bg-white relative">
      
      
      <div className="absolute top-4 right-4 text-sm text-gray-500">Step 6 / 10</div>

     
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-blue-800 mb-2">Security</h2>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${(step / 10) * 100}%` }}
          />
        </div>
      </div>

     
      <p className="text-sm text-gray-700 mb-6">
        Enhance your account security with these additional measures.
      </p>

      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Two-Factor Authentication (2FA)</h3>
        <p className="text-sm text-gray-600 mb-3">
          Receive a code on your mobile device each time you login.
        </p>

        <div className="  bg-emerald-50 border  border-gray-200 rounded p-4 text-sm text-gray-600 mb-6">
          <strong className="block font-medium text-gray-800 mb-1">Why We Use 2FA</strong>
          Two-factor authentication adds an extra layer of security to your account. Even if someone knows your password, they won’t be able to access your account without the verification code sent to your mobile device.
        </div>
      </div>

     
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
        <p className="text-xs text-gray-500 mt-1">Your answer is case-senstive</p>
      </div>

      
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
      setStep(8);
    }}
    className="w-125 max-w-2xl"
  >
    <div className="border border-gray-300  rounded-2xl rounded p-6 shadow-sm bg-white relative text-center">
      <div className="absolute top-4 right-4 text-sm text-gray-500">Step 7/10</div>

      <h2 className="text-2xl font-extrabold text-blue-800 mb-2">Terms & Condition</h2>

      <div className="h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${(step / 10) * 100}%` }}
        />
      </div>

      <p className="text-sm text-gray-700 mb-6">
        Please review and accept our terms and conditions to continue.
      </p>

      <div className="max-h-64 overflow-y-auto border border-gray-200 rounded p-4 bg-gray-50 text-sm text-gray-700 mb-6 space-y-4 text-left">
        <p className="text-xs italic text-gray-500 text-right">Last Updated: July 2025</p>
        <div>
          <strong>Welcome to ABCD Bank</strong><br />
          By creating an account, you agree to the following Terms and Conditions:
        </div>
        <div>
          <strong>1. Account Usage</strong><br />
          You are responsible for maintaining the confidentiality of your account.
        </div>
        <div>
          <strong>2. Privacy Policy</strong><br />
          Your use of our services is subject to our Privacy Policy.
        </div>
        <div>
          <strong>3. Electronic Communications</strong><br />
          You consent to receive communications from us electronically.
        </div>
        <div>
          <strong>4. Fees and Charges</strong><br />
          You agree to pay all applicable fees and charges as outlined.
        </div>
        <div>
          <strong>5. Termination</strong><br />
          We may terminate your account for any violation of the Terms.
        </div>
      </div>

     
      <div className="space-y-3 text-sm text-gray-700 mb-6 text-left">
        <label className="flex items-start space-x-2">
          <input type="checkbox" checked={consent1} onChange={(e) => setConsent1(e.target.checked)} className="mt-1" />
          <span>I have read and agree to the <a href="#" className="text-emerald-600 underline hover:text-emerald-700">Terms & Conditions</a>.</span>
        </label>
        <label className="flex items-start space-x-2">
          <input type="checkbox" checked={consent2} onChange={(e) => setConsent2(e.target.checked)} className="mt-1" />
          <span>I have read and agree to the <a href="#" className="text-emerald-600 underline hover:text-emerald-700">Privacy policy</a>.</span>
        </label>
        <label className="flex items-start space-x-2">
          <input type="checkbox" checked={consent3} onChange={(e) => setConsent3(e.target.checked)} className="mt-1" />
          <span>I consent to receive electronic communications from ABCD Bank including account statements, notices, and marketing communication.</span>
        </label>
        <label className="flex items-start space-x-2">
          <input type="checkbox" checked={consent4} onChange={(e) => setConsent4(e.target.checked)} className="mt-1" />
          <span>I confirm that the information I provide is accurate and correct.</span>
        </label>
      </div>

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

{step === 8 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStep(10); 
    }}
    className="w-125 max-w-2xl"
  >
    <div className="border border-gray-300 rounded-2xl rounded p-6 shadow-sm bg-white relative">
      <div className="absolute top-4 right-4 text-sm text-gray-500">Step 8 / 10</div>

      <h2 className="text-2xl font-extrabold text-blue-800 ">Review & Submit</h2>
      <div className="h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${(step / 10) * 100}%` }}
        />
      </div>

      <p className="text-sm text-gray-700 text-center mb-6">
        Please review your information before submitting your application.
      </p>

      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <table className="w-full text-sm text-left text-gray-700">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium w-1/3">Personal details</td>
              <td className="py-2 space-y-2">
                
                <textarea
                  rows="4"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  defaultValue={`Full Name: ${fullName}\nDOB: ${dob}\nGender: ${gender}`}
                />
              </td>
              <td className="py-2 text-right">
                <button type="button" onClick={() => setStep(2)}>
                  <img src={editIcon} alt="Edit" className="w-5 h-5 hover:opacity-80 transition" />
                </button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-medium">Create your Account</td>
              <td className="py-2 space-y-2">
                <div>{email}</div>
                <textarea
                  rows="2"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  defaultValue={`Email: ${email}`}
                />
              </td>
              <td className="py-2 text-right">
                <button type="button" onClick={() => setStep(1)}>
                  <img src={editIcon} alt="Edit" className="w-5 h-5 hover:opacity-80 transition" />
                </button>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-2 font-medium">Contact information</td>
              <td className="py-2 space-y-2">
                <div>{phone}</div>
                <textarea
                  rows="2"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  defaultValue={`Phone: ${phone}`}
                />
              </td>
              <td className="py-2 text-right">
                <button type="button" onClick={() => setStep(3)}>
                  <img src={editIcon} alt="Edit" className="w-5 h-5 hover:opacity-80 transition" />
                </button>
              </td>
            </tr>

            <tr>
              <td className="py-2 font-medium">Address Details</td>
              <td className="py-2 space-y-2">
                <div>{address}</div>
                <textarea
                  rows="3"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  defaultValue={`Address: ${address}`}
                />
              </td>
              <td className="py-2 text-right">
                <button type="button" onClick={() => setStep(4)}>
                  <img src={editIcon} alt="Edit" className="w-5 h-5 hover:opacity-80 transition" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

     
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => setStep(7)}
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





{step === 10 && (
  
  <div className="w-150 max-w-2xl mx-auto">
    <div className="border border-gray-300 rounded-2xl rounded p-6 shadow-sm bg-white relative">
      <div className="absolute top-4 right-4 text-sm text-gray-500">Step 10 / 10</div>

     
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-green-700 mb-2">
          Account Created Successfully
        </h2>
        <div className="text-5xl text-green-600 mb-4">✔️</div> 
      </div>

    
      <div className="h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-green-600 rounded-full transition-all duration-300"
          style={{ width: `100%` }}
        />
      </div>

     
      <p className="text-center text-gray-700 mb-4">
         Your account has been successfully created and your submitted files have been confirmed.
      </p>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
  <h3 className="text-lg font-semibold text-center text-gray-800 mb-3">What's Next?</h3>
  <ul className="space-y-2 text-sm text-gray-700">
    <li className="flex items-start">
      <span className="text-blue-600 mr-2 mt-0.5">✔️</span>
      <span>We'll review your application within 1-2 business days.</span>
    </li>
    <li className="flex items-start">
      <span className="text-blue-600 mr-2 mt-0.5">✔️</span>
      <span>You'll receive an email confirmation once your account is activated.</span>
    </li>
    <li className="flex items-start">
      <span className="text-blue-600 mr-2 mt-0.5">✔️</span>
      <span>Your debit card will be mailed to your address within 5–7 business days.</span>
    </li>
  </ul>
</div>

     
      <div className="flex justify-center gap-4 my-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            setStep(0); 
            navigate("/login");
          }}
          className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
        >
          Logout
        </button>
      </div>

     
      <div className="mt-8 text-center border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Need Help?</h3>
                <p className="text-xs text-gray-400">Our support team is available 24/7 to assist you.</p>

        <p className="text-sm text-gray-600 mb-1">
          💬 Live Chat · ✉️ support@example.com · 📞 +91 98765 43210
        </p>
        
      </div>
    </div>
  </div>
)}

      
    </div>
  );
};

export default Register;
