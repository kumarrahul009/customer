import React, { useState, useRef } from "react";
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    otp: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    idFile: null,
    selfie: null,
    securityQuestion: "",
    securityAnswer: "",
    consent1: false,
    consent2: false,
    consent3: false,
    consent4: false,
  });

  const otpRefs = useRef([]);
  const totalSteps = 10;

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation functions for each step
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreed) {
      newErrors.agreed = "You must agree to the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    const otp = otpRefs.current.map((input) => input?.value).join("");
    if (!otp || otp.length !== 6) {
      newErrors.otp = "Please enter a valid 6-digit OTP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.address1) {
      newErrors.address1 = "Address is required";
    } else if (formData.address1.length < 10) {
      newErrors.address1 = "Address must be at least 10 characters";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.postal) {
      newErrors.postal = "Postal code is required";
    } else if (!/^\d{6}$/.test(formData.postal)) {
      newErrors.postal = "Postal code must be 6 digits";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep5 = () => {
    const newErrors = {};
    if (!formData.idFile) {
      newErrors.idFile = "ID document is required";
    }

    if (!formData.selfie) {
      newErrors.selfie = "Selfie is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep6 = () => {
    const newErrors = {};
    if (!formData.securityQuestion) {
      newErrors.securityQuestion = "Security question is required";
    }

    if (!formData.securityAnswer) {
      newErrors.securityAnswer = "Security answer is required";
    } else if (formData.securityAnswer.length < 3) {
      newErrors.securityAnswer = "Answer must be at least 3 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep7 = () => {
    const newErrors = {};
    if (!formData.consent1) {
      newErrors.consent1 = "You must agree to the Terms & Conditions";
    }

    if (!formData.consent2) {
      newErrors.consent2 = "You must agree to the Privacy Policy";
    }

    if (!formData.consent4) {
      newErrors.consent4 = "You must confirm your information is accurate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mark all required fields as touched for each step
  const markAllFieldsTouched = (step) => {
    const fieldsToTouch = {
      1: ["email", "password", "confirmPassword", "agreed"],
      2: ["fullName", "dob", "gender"],
      3: ["mobile", "otp"],
      4: ["address1", "city", "state", "postal", "country"],
      5: ["idFile", "selfie"],
      6: ["securityQuestion", "securityAnswer"],
      7: ["consent1", "consent2", "consent4"],
    };

    const touchedFields = fieldsToTouch[step]?.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});

    if (touchedFields) {
      setTouched((prev) => ({ ...prev, ...touchedFields }));
    }
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
    const otp = otpRefs.current.map((input) => input?.value).join("");
    if (otp.length === 6) {
      setStep(4);
    } else {
      setErrors({ otp: "Please enter all 6 digits" });
    }
  };

  const handleOpenCamera = () => {
    alert("Open camera here or implement live capture logic");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    setStep(10);
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
            markAllFieldsTouched(1);
            if (validateStep1()) {
              setStep(2);
            }
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              className={`w-full px-4 py-2 border ${
                touched.email && (!formData.email || errors.email) ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              placeholder="Email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              required
            />
            {touched.email && errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <div className="relative">
              <input
                type="password"
                className={`w-full px-4 py-2 pr-10 border ${
                  touched.password && (!formData.password || errors.password) ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                onBlur={() => handleBlur("password")}
                required
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
            {touched.password && errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
            <input
              type="password"
              className={`w-full px-4 py-2 border ${
                touched.confirmPassword && (!formData.confirmPassword || errors.confirmPassword) ? 'border-red-500' : 'border-gray-300'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData("confirmPassword", e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              required
            />
            {touched.confirmPassword && errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="mb-4 flex items-start">
            <input
              id="terms"
              type="checkbox"
              checked={formData.agreed}
              onChange={(e) => updateFormData("agreed", e.target.checked)}
              onBlur={() => handleBlur("agreed")}
              className={`mt-1 mr-2 ${touched.agreed && !formData.agreed ? 'border-red-500 outline-red-500' : ''}`}
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the <a href="#" className="text-emerald-600 underline hover:text-emerald-700">Terms & Conditions</a> *
            </label>
          </div>
          {touched.agreed && errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}

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
            markAllFieldsTouched(2);
            if (validateStep2()) {
              setStep(3);
            }
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

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                className={`w-full px-4 py-2 border ${
                  touched.fullName && errors.fullName
                    ? 'border-red-500'
                    : touched.fullName && formData.fullName && !errors.fullName
                    ? 'border-green-500'
                    : 'border-gray-300'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                onBlur={() => handleBlur("fullName")}
                required
              />
              {touched.fullName && formData.fullName && !errors.fullName && (
                <span className="absolute right-3 top-2.5 bg-green-100 border border-green-500 rounded-full p-1">
                  <img src={tick} alt="tick icon" className="w-4 h-4" />
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">As it appears on your ID document</p>
            {touched.fullName && errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Date of Birth *</label>
            <input
              type="date"
              className={`w-full px-4 py-2 border ${
                touched.dob && (!formData.dob || errors.dob) ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-emerald-400`}
              value={formData.dob}
              onChange={(e) => updateFormData("dob", e.target.value)}
              onBlur={() => handleBlur("dob")}
              required
            />
            <p className="text-xs text-gray-500 mt-1">You must be at least 18 years old</p>
            {touched.dob && errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Gender *</label>
            <select
              className={`w-full px-4 py-2 border ${
                touched.gender && (!formData.gender || errors.gender) ? 'border-red-500' : 'border-gray-300'
              } rounded focus:outline-none focus:ring-2 focus:ring-emerald-400`}
              value={formData.gender}
              onChange={(e) => updateFormData("gender", e.target.value)}
              onBlur={() => handleBlur("gender")}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {touched.gender && errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
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
            markAllFieldsTouched(3);
            if (validateStep3()) {
              setStep(4);
            }
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-white"
                disabled
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Mobile Number *</label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => updateFormData("mobile", e.target.value)}
                onBlur={() => handleBlur("mobile")}
                placeholder="Mobile Number"
                className={`w-full px-4 py-2 border ${
                  touched.mobile && (!formData.mobile || errors.mobile) ? 'border-red-500' : 'border-gray-300'
                } rounded`}
              />
              <button
                type="button"
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Send OTP
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number</p>
            {touched.mobile && errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          <div className={`mb-4 p-4 border ${
            touched.otp && errors.otp ? 'border-red-300 bg-red-50' : 'border-blue-300 bg-blue-50'
          } rounded`}>
            <p className="text-sm font-semibold mb-2 text-blue-800">OTP Verification *</p>

            <div className="flex items-center gap-2 flex-wrap">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOTPChange(e, index)}
                  onKeyDown={(e) => handleOTPKeyDown(e, index)}
                  onBlur={() => handleBlur("otp")}
                  className={`w-10 h-10 text-center border ${
                    touched.otp && errors.otp ? 'border-red-500' : 'border-gray-300'
                  } rounded text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              ))}
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline ml-auto"
              >
                Resend OTP
              </button>
            </div>
            {touched.otp && errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}

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
            markAllFieldsTouched(4);
            if (validateStep4()) {
              setStep(5);
            }
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
              <label className="block text-sm text-gray-700 mb-1"> Permanent Address *</label>
              <textarea
                rows={3}
                value={formData.address1}
                onChange={(e) => updateFormData("address1", e.target.value)}
                onBlur={() => handleBlur("address1")}
                placeholder="Permanent Address"
                className={`w-full px-4 py-2 border ${
                  touched.address1 && (!formData.address1 || errors.address1) ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none`}
                required
              />
              {touched.address1 && errors.address1 && <p className="text-red-500 text-xs mt-1">{errors.address1}</p>}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">City *</label>
                <select
                  value={formData.city}
                  onChange={(e) => updateFormData("city", e.target.value)}
                  onBlur={() => handleBlur("city")}
                  className={`w-full px-4 py-2 border ${
                    touched.city && (!formData.city || errors.city) ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  required
                >
                  <option value="">Select City</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                </select>
                {touched.city && errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">State/Province *</label>
                <select
                  value={formData.state}
                  onChange={(e) => updateFormData("state", e.target.value)}
                  onBlur={() => handleBlur("state")}
                  className={`w-full px-4 py-2 border ${
                    touched.state && (!formData.state || errors.state) ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  required
                >
                  <option value="">Select State</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                </select>
                {touched.state && errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Postal Code *</label>
                <input
                  type="text"
                  value={formData.postal}
                  onChange={(e) => updateFormData("postal", e.target.value)}
                  onBlur={() => handleBlur("postal")}
                  placeholder="Postal code"
                  className={`w-full px-4 py-2 border ${
                    touched.postal && (!formData.postal || errors.postal) ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  required
                />
                {touched.postal && errors.postal && <p className="text-red-500 text-xs mt-1">{errors.postal}</p>}
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => updateFormData("country", e.target.value)}
                  onBlur={() => handleBlur("country")}
                  className={`w-full px-4 py-2 border ${
                    touched.country && (!formData.country || errors.country) ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Canada">Canada</option>
                </select>
                {touched.country && errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
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
            markAllFieldsTouched(5);
            if (validateStep5()) {
              setStep(6);
            }
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Government ID *</label>
                  <div className={`border ${
                    touched.idFile && errors.idFile ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg p-6 text-center hover:bg-gray-50`}>
                    <img src={uploadIdIcon} alt="Upload ID Icon" className="mx-auto w-10 h-10 mb-2" />
                    <button
                      type="button"
                      onClick={() => document.getElementById("cameraUploadID").click()}
                      className="bg-blue-100 text-blue-700 font-medium py-1.5 px-4 rounded hover:bg-blue-200 transition"
                    >
                      Browse File
                    </button>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      id="cameraUploadID"
                      onChange={(e) => updateFormData("idFile", e.target.files[0])}
                      onBlur={() => handleBlur("idFile")}
                    />
                  </div>
                  {touched.idFile && errors.idFile && <p className="text-red-500 text-xs mt-1">{errors.idFile}</p>}
                  {formData.idFile && (
                    <p className="text-sm text-green-600 mt-2">Selected ID: {formData.idFile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Live Photo *</label>
                  <div className={`border-2 ${
                    touched.selfie && errors.selfie ? 'border-red-500' : 'border-dashed border-gray-300'
                  } rounded-lg p-6 text-center hover:border-blue-400`}>
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
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                      id="cameraUploadSelfie"
                      onChange={(e) => updateFormData("selfie", e.target.files[0])}
                      onBlur={() => handleBlur("selfie")}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="fileUpload"
                      onChange={(e) => updateFormData("selfie", e.target.files[0])}
                    />
                  </div>
                  {touched.selfie && errors.selfie && <p className="text-red-500 text-xs mt-1">{errors.selfie}</p>}
                  {formData.selfie && (
                    <p className="text-sm text-green-600 mt-2">Selected Selfie: {formData.selfie.name}</p>
                  )}
                </div>
              </div>
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
            markAllFieldsTouched(6);
            if (validateStep6()) {
              setStep(7);
            }
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
              <h3 className="text-lg font-medium text-gray-800 mb-2">Security Questions *</h3>
              <p className="text-sm text-gray-600 mb-4">
                Set up a security question to help verify your identity if you need to recover your account.
              </p>

              <select
                value={formData.securityQuestion}
                onChange={(e) => updateFormData("securityQuestion", e.target.value)}
                onBlur={() => handleBlur("securityQuestion")}
                className={`w-full p-2 border ${
                  touched.securityQuestion && (!formData.securityQuestion || errors.securityQuestion) ? 'border-red-500' : 'border-gray-300'
                } rounded mb-4 text-sm`}
                required
              >
                <option value="">Select a security question *</option>
                <option value="pet">What is the name of your first pet?</option>
                <option value="school">What was your primary school's name?</option>
                <option value="city">In what city were you born?</option>
                <option value="nickname">What was your childhood nickname?</option>
              </select>
              {touched.securityQuestion && errors.securityQuestion && <p className="text-red-500 text-xs mt-1">{errors.securityQuestion}</p>}

              <input
                type="text"
                value={formData.securityAnswer}
                onChange={(e) => updateFormData("securityAnswer", e.target.value)}
                onBlur={() => handleBlur("securityAnswer")}
                placeholder="Your answer *"
                className={`w-full p-2 border ${
                  touched.securityAnswer && (!formData.securityAnswer || errors.securityAnswer) ? 'border-red-500' : 'border-gray-300'
                } rounded text-sm`}
                required
              />
              {touched.securityAnswer && errors.securityAnswer && <p className="text-red-500 text-xs mt-1">{errors.securityAnswer}</p>}
              <p className="text-xs text-gray-500 mt-1">Your answer is case-sensitive</p>
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
            markAllFieldsTouched(7);
            if (validateStep7()) {
              setStep(8);
            }
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
                <input
                  type="checkbox"
                  checked={formData.consent1}
                  onChange={(e) => updateFormData("consent1", e.target.checked)}
                  onBlur={() => handleBlur("consent1")}
                  className={`mt-1 ${touched.consent1 && !formData.consent1 ? 'border-red-500 outline-red-500' : ''}`}
                  required
                />
                <span>
                  I have read and agree to the{' '}
                  <a href="#" className="text-emerald-600 underline hover:text-emerald-700">
                    Terms & Conditions
                  </a>
                  . *
                </span>
              </label>
              {touched.consent1 && errors.consent1 && <p className="text-red-500 text-xs ml-6 -mt-2">{errors.consent1}</p>}

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.consent2}
                  onChange={(e) => updateFormData("consent2", e.target.checked)}
                  onBlur={() => handleBlur("consent2")}
                  className={`mt-1 ${touched.consent2 && !formData.consent2 ? 'border-red-500 outline-red-500' : ''}`}
                  required
                />
                <span>
                  I have read and agree to the{' '}
                  <a href="#" className="text-emerald-600 underline hover:text-emerald-700">
                    Privacy policy
                  </a>
                  . *
                </span>
              </label>
              {touched.consent2 && errors.consent2 && <p className="text-red-500 text-xs ml-6 -mt-2">{errors.consent2}</p>}

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.consent3}
                  onChange={(e) => updateFormData("consent3", e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I consent to receive electronic communications from ABCD Bank including account statements, notices,
                  and marketing communication.
                </span>
              </label>

              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.consent4}
                  onChange={(e) => updateFormData("consent4", e.target.checked)}
                  onBlur={() => handleBlur("consent4")}
                  className={`mt-1 ${touched.consent4 && !formData.consent4 ? 'border-red-500 outline-red-500' : ''}`}
                  required
                />
                <span>I confirm that the information I provide is accurate and correct. *</span>
              </label>
              {touched.consent4 && errors.consent4 && <p className="text-red-500 text-xs ml-6 -mt-2">{errors.consent4}</p>}
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
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
            <div className="absolute top-4 right-4 text-sm text-gray-500">Step 10 / 10</div>

            <div className="text-center pt-8 pb-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Account Created Successfully!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Welcome to <span className="font-semibold text-blue-600">ABCD Bank</span>, {formData.fullName}! Your account was created on Thursday, August 14, 2025 at 02:09 PM IST.
              </p>
            </div>

            <div className="h-1.5 bg-gray-100 rounded-full mb-8">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Next Steps</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                <li>Download the ABCD Bank mobile app to manage your account.</li>
                <li>Log in with your email and password to access your dashboard.</li>
                <li>Contact support if you need assistance: support@abcdbank.com.</li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 shadow-md text-lg font-medium"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;