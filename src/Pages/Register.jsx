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
  const [errors, setErrors] = useState({}); // State for error messages
  const [touched, setTouched] = useState({}); // State to track if fields were touched

<<<<<<< HEAD
  

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

  const [address1Error, setAddress1Error] = useState("");
const [cityError, setCityError] = useState("");
const [stateError, setStateError] = useState("");
const [postalError, setPostalError] = useState("");
const [countryError, setCountryError] = useState("");


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
     

=======
  // Central form data state
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
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f

  const otpRefs = useRef([]);
  const totalSteps = 10;

  // Update form data and clear errors/touched state
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Handle input blur to mark field as touched
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Validation functions
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

  // Mark all required fields as touched for Step 1
  const markAllStep1FieldsTouched = () => {
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      agreed: true,
    });
  };

  // Mark all required fields as touched for Step 2
  const markAllStep2FieldsTouched = () => {
    setTouched({
      fullName: true,
      dob: true,
      gender: true,
    });
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
      setStep(4);
    } else {
      alert("Please enter all 6 digits");
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
  <form
    onSubmit={(e) => {
      e.preventDefault(); // prevent page reload
      console.log("Step 0 form submitted");
      setStep(1); // go to next step
    }}
    className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full border border-emerald-200 text-center mx-auto"
  >
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

<<<<<<< HEAD
    <div className="mt-6 p-4 border border-emerald-300 rounded bg-emerald-50 text-left text-sm text-emerald-800">
      ✅ You’ll need a valid government ID <br /> ⏱️ About 10 minutes to complete this process
    </div>

    <button
      type="submit"
      className="mt-6 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 shadow"
    >
      Get Started
    </button>
  </form>
)}
=======
          <div className="mt-6 p-4 border border-emerald-300 rounded bg-emerald-50 text-left text-sm text-emerald-800">
            ✅ You'll need a valid government ID <br /> ⏱️ About 10 minutes to complete this process
          </div>
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f


      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            markAllStep1FieldsTouched();
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
            markAllStep2FieldsTouched();
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
                  touched.fullName
                    ? !formData.fullName || errors.fullName
                      ? 'border-red-500'
                      : 'border-green-500'
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

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your Email Address"
                className="w-full px-4 py-2 border border-gray-300 rounded bg-white"
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

<<<<<<< HEAD
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
  <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full border border-emerald-200">
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
        <label className="block text-sm text-gray-700 mb-1">Permanent Address</label>
        <textarea
          rows={3}
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          placeholder="Permanent Address"
          className={`w-full px-4 py-2 border rounded resize-none ${
            address1Error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {address1Error && (
          <p className="text-xs text-red-500 mt-1">{address1Error}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">
          Residence Address <span className="text-gray-400">(Optional)</span>
        </label>
        <textarea
          rows={3}
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          placeholder="Residence Address"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full px-4 py-2 border rounded ${
              cityError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select City</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>
          {cityError && <p className="text-xs text-red-500 mt-1">{cityError}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">State/Province</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={`w-full px-4 py-2 border rounded ${
              stateError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select State</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
          </select>
          {stateError && <p className="text-xs text-red-500 mt-1">{stateError}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Postal Code</label>
          <input
            type="text"
            value={postal}
            placeholder="Postal Code"
            onChange={(e) => setPostal(e.target.value)}
            className={`w-full px-4 py-2 border rounded ${
              postalError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {postalError && <p className="text-xs text-red-500 mt-1">{postalError}</p>}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Country</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`w-full px-4 py-2 border rounded ${
              countryError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
          </select>
          {countryError && <p className="text-xs text-red-500 mt-1">{countryError}</p>}
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
        type="button"
        onClick={() => {
          let valid = true;

          if (!address1) {
            setAddress1Error("Permanent address is required");
            valid = false;
          } else {
            setAddress1Error("");
          }

          if (!city) {
            setCityError("City is required");
            valid = false;
          } else {
            setCityError("");
          }

          if (!state) {
            setStateError("State is required");
            valid = false;
          } else {
            setStateError("");
          }

          if (!postal) {
            setPostalError("Postal code is required");
            valid = false;
          } else {
            setPostalError("");
          }

          if (!country) {
            setCountryError("Country is required");
            valid = false;
          } else {
            setCountryError("");
          }

          if (valid) {
            setStep(5);
          }
        }}
        className="bg-emerald-600 text-white py-2 px-6 rounded hover:bg-emerald-700 shadow"
      >
        Continue
      </button>
    </div>
  </div>
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
=======
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
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
              <button
                type="button"
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Send OTP
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number</p>
          </div>

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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Government ID</label>
                  <div className="border border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50">
                    <img src={uploadIdIcon} alt="Upload ID Icon" className="mx-auto w-10 h-10 mb-2" />
                    <button
                      type="button"
                      onClick={() => document.getElementById("cameraUploadID").click()}
                      className="bg-blue-100 text-blue-700 font-medium py-1.5 px-4 rounded hover:bg-blue-200 transition"
                    >
                      Browse File
                    </button>
                  </div>
                </div>

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

              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                id="cameraUploadID"
                onChange={(e) => updateFormData("idFile", e.target.files[0])}
              />

              <input
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                id="cameraUploadSelfie"
                onChange={(e) => updateFormData("selfie", e.target.files[0])}
              />

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
                <input
                  type="checkbox"
                  checked={formData.consent1}
                  onChange={(e) => updateFormData("consent1", e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I have read and agree to the{' '}
                  <a href="#" className="text-emerald-600 underline hover:text-emerald-700">
                    Terms & Conditions
                  </a>
                  .
                </span>
              </label>
              <label className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={formData.consent2}
                  onChange={(e) => updateFormData("consent2", e.target.checked)}
                  className="mt-1"
                />
                <span>
                  I have read and agree to the{' '}
                  <a href="#" className="text-emerald-600 underline hover:text-emerald-700">
                    Privacy policy
                  </a>
                  .
                </span>
              </label>
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
                  className="mt-1"
                />
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
                Welcome to <span className="font-semibold text-blue-600">ABCD Bank</span>, {formData.fullName}!
              </p>
            </div>

            <div className="h-1.5 bg-gray-100 rounded-full mb-8">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Your Account Summary
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="bg-blue-100 p-1 rounded mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="font-medium">{formData.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-100 p-1 rounded mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="font-medium">
                        {formData.address1}
                        <br />
                        {formData.city}, {formData.state}
                        <br />
                        {formData.country} - {formData.postal}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="bg-blue-100 p-1 rounded mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
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

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-emerald-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                What's Next?
              </h3>

              <div className="space-y-3">
                <div className="flex items-start bg-green-50 p-4 rounded-lg border border-green-100">
                  <span className="bg-green-100 p-1 rounded mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Email Verification</h4>
                    <p className="text-sm text-gray-600">
                      We've sent a verification link to <span className="font-medium">{formData.email}</span>. Please
                      check your inbox and verify your email address.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <span className="bg-blue-100 p-1 rounded mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Debit Card Delivery</h4>
                    <p className="text-sm text-gray-600">
                      Your debit card will be mailed to your registered address within 5-7 business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <span className="bg-purple-100 p-1 rounded mr-3 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-purple-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Mobile App</h4>
                    <p className="text-sm text-gray-600">
                      Download our mobile app to access your account anytime, anywhere. Available on iOS and Android.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition shadow-md flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000 16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            </div>

            <div className="border-t pt-6 text-center">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Need Help?
              </h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  Live Chat
                </a>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  support@abcdbank.com
                </a>
                <a href="#" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD

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
          Submit
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

      
=======
      )}
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
    </div>
  );
};

export default Register;