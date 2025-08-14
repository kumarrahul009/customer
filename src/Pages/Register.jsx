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

  // Central form data state
  const [formData, setFormData] = useState({
    // Step 1 data
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,

    // Step 2 data
    fullName: "",
    dob: "",
    gender: "",

    // Step 3 data
    mobile: "",
    otp: "",
    phone: "",

    // Step 4 data
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "",

    // Step 5 data
    idFile: null,
    selfie: null,

    // Step 6 data
    securityQuestion: "",
    securityAnswer: "",

    // Step 7 data
    consent1: false,
    consent2: false,
    consent3: false,
    consent4: false,
  });

  const otpRefs = useRef([]);
  const totalSteps = 10;

  // Update form data helper function
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  const handleOpenCamera = () => {
    alert("Open camera here or implement live capture logic");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send formData to your backend
    console.log("Submitting form data:", formData);
    setStep(10); // Go to success step
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
            ✅ You'll need a valid government ID <br /> ⏱️ About 10 minutes to complete this process
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
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
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
              value={formData.confirmPassword}
              onChange={(e) => updateFormData("confirmPassword", e.target.value)}
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
              checked={formData.agreed}
              onChange={(e) => updateFormData("agreed", e.target.checked)}
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
              value={formData.fullName}
              onChange={(e) => updateFormData("fullName", e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">As it appears on your ID document</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={formData.dob}
              onChange={(e) => updateFormData("dob", e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">You must be at least 18 years old</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Gender</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              value={formData.gender}
              onChange={(e) => updateFormData("gender", e.target.value)}
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
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your Email Address"
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded bg-white"
              />
              {formData.email.includes("@") && (
                <span className="absolute right-3 top-2.5 bg-green-100 border border-green-500 rounded-full p-1">
                  <img src={tick} alt="tick icon" className="w-4 h-4" />
                </span>
              )}
            </div>
            {formData.email.includes("@") && (
              <p className="text-xs text-green-600 mt-1">Email verified</p>
            )}
          </div>

          {/* Mobile Number input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Mobile Number</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => updateFormData("mobile", e.target.value)}
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
                value={formData.address1}
                onChange={(e) => updateFormData("address1", e.target.value)}
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
                value={formData.address2}
                onChange={(e) => updateFormData("address2", e.target.value)}
                placeholder="Residence address"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div> 

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">City</label>
                <select
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
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
                  value={formData.state}
                  onChange={(e) => updateFormData("state", e.target.value)}
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
                  value={formData.postal}
                  placeholder="Postal code"
                  onChange={(e) => updateFormData("postal", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => updateFormData("country", e.target.value)}
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
                onChange={(e) => updateFormData("idFile", e.target.files[0])}
              />

              {/* Front camera for selfie */}
              <input
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                id="cameraUploadSelfie"
                onChange={(e) => updateFormData("selfie", e.target.files[0])}
              />

              {/* Browse file input */}
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                id="fileUpload"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file.type.includes("image")) {
                    updateFormData("selfie", file);
                  } else {
                    updateFormData("idFile", file);
                  }
                }}
              />

              {/* Show selected file name */}
              {formData.idFile && (
                <p className="text-sm text-green-600 mt-2">Selected ID: {formData.idFile.name}</p>
              )}
              {formData.selfie && (
                <p className="text-sm text-green-600 mt-2">Selected Selfie: {formData.selfie.name}</p>
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

              <div className="bg-emerald-50 border border-gray-200 rounded p-4 text-sm text-gray-600 mb-6">
                <strong className="block font-medium text-gray-800 mb-1">Why We Use 2FA</strong>
                Two-factor authentication adds an extra layer of security to your account. Even if someone knows your password, they won't be able to access your account without the verification code sent to your mobile device.
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Security Questions</h3>
              <p className="text-sm text-gray-600 mb-4">
                Set up a security question to help verify your identity if you need to recover your account.
              </p>

              <select
                value={formData.securityQuestion}
                onChange={(e) => updateFormData("securityQuestion", e.target.value)}
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
                value={formData.securityAnswer}
                onChange={(e) => updateFormData("securityAnswer", e.target.value)}
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
          <div className="border border-gray-300 rounded-2xl rounded p-6 shadow-sm bg-white relative text-center">
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
                <input type="checkbox" checked={formData.consent1} onChange={(e) => updateFormData("consent1", e.target.checked)} className="mt-1" />
                <span>I have read and agree to the <a href="#" className="text-emerald-600 underline hover:text-emerald-700">Terms & Conditions</a>.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={formData.consent2} onChange={(e) => updateFormData("consent2", e.target.checked)} className="mt-1" />
                <span>I have read and agree to the <a href="#" className="text-emerald-600 underline hover:text-emerald-700">Privacy policy</a>.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={formData.consent3} onChange={(e) => updateFormData("consent3", e.target.checked)} className="mt-1" />
                <span>I consent to receive electronic communications from ABCD Bank including account statements, notices, and marketing communication.</span>
              </label>
              <label className="flex items-start space-x-2">
                <input type="checkbox" checked={formData.consent4} onChange={(e) => updateFormData("consent4", e.target.checked)} className="mt-1" />
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
          onSubmit={handleSubmit}
          className="w-125 max-w-2xl"
        >
          <div className="border border-gray-300 rounded-2xl rounded p-6 shadow-sm bg-white relative">
            <div className="absolute top-4 right-4 text-sm text-gray-500">Step 8 / 10</div>

            <h2 className="text-2xl font-extrabold text-blue-800">Review & Submit</h2>
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
                        defaultValue={`Full Name: ${formData.fullName}\nDOB: ${formData.dob}\nGender: ${formData.gender}`}
                        readOnly
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
                      {/* <div>{formData.email}</div> */}
                      <textarea
                        rows="2"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        defaultValue={`Email: ${formData.email}`}
                        readOnly
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
                      {/* <div>{formData.mobile}</div> */}
                      <textarea
                        rows="2"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        defaultValue={`Phone: ${formData.mobile}`}
                        readOnly
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
                      {/* <div>
                        {formData.address1} {formData.address2 && `, ${formData.address2}`}
                      </div> */}
                      <textarea
                        rows="3"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        defaultValue={`Address: ${formData.address1}${formData.address2 ? `, ${formData.address2}` : ''}\n${formData.city}, ${formData.state}\n${formData.postal}, ${formData.country}`}
                        readOnly
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
                Submit
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 10 && (
        <div className="w-full max-w-2xl mx-4">
          <div className="border border-gray-200 rounded-2xl p-6 shadow-lg bg-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
            <div className="absolute top-4 right-4 text-sm text-gray-500">Step 10 / 10</div>

            {/* Main content */}
            <div className="text-center pt-8 pb-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Account Created Successfully!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to <span className="font-semibold text-blue-600">ABCD Bank</span>, {formData.fullName}!
              </p>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-gray-100 rounded-full mb-8">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
            </div>

            {/* Account summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                Your Account Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-blue-100 p-1 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="font-medium">{formData.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="bg-blue-100 p-1 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="bg-blue-100 p-1 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Mobile</p>
                      <p className="font-medium">{formData.mobile}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-blue-100 p-1 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="font-medium">
                        {formData.address1}<br />
                        {formData.city}, {formData.state}<br />
                        {formData.country} - {formData.postal}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="bg-blue-100 p-1 rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account Created</p>
                      <p className="font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                What's Next?
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start bg-green-50 p-4 rounded-lg border border-green-100">
                  <span className="bg-green-100 p-1 rounded mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Email Verification</h4>
                    <p className="text-sm text-gray-600">We've sent a verification link to <span className="font-medium">{formData.email}</span>. Please check your inbox and verify your email address.</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <span className="bg-blue-100 p-1 rounded mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Debit Card Delivery</h4>
                    <p className="text-sm text-gray-600">Your debit card will be mailed to your registered address within 5-7 business days.</p>
                  </div>
                </div>
                
                <div className="flex items-start bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <span className="bg-purple-100 p-1 rounded mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Mobile App</h4>
                    <p className="text-sm text-gray-600">Download our mobile app to access your account anytime, anywhere. Available on iOS and Android.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setStep(0);
                  navigate("/login");
                }}
                className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition shadow flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Logout
              </button>
            </div>

            <div className="border-t pt-6 text-center">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
                Need Help?
              </h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  Live Chat
                </a>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  support@abcdbank.com
                </a>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;