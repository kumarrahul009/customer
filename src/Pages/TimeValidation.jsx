import React, { useState } from "react";
import uploadIcon from '../assets/imges/upload.jpg';
import { useNavigate } from 'react-router-dom';

const TimeValidation = () => {
  const [step, setStep] = useState(1);
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "Mr.",
    name: "",
    mobile: "",
    additionalMobile: "",
    pan: "",
    dob: "",
    email: "",
    referralCode: "FY25256",
  });

  const stepsList = ["Primary Details", "KYC Details", "Payment Details", "VKYC", "Summary"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const next = () => setStep((prev) => Math.min(prev + 1, stepsList.length));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-100 p-6">

{step === 1 && (
  <div className="bg-white rounded-lg shadow-md p-6 max-w-lg mx-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold" style={{ color: "#2095f2" }}>
        {stepsList[step - 1]}
      </h2>
      <span className="text-sm text-gray-500 font-medium">Step {step} / 5</span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(step / stepsList.length) * 100}%` }}
      ></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <select
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        >
          <option>Mr.</option>
          <option>Ms.</option>
          <option>Mrs.</option>
          <option>Mx.</option>
        </select>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter Name as on PAN</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter Name"
          className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        />
      </div>

      {/* Mobile */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        />
      </div>

      {/* Additional Mobile */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mobile Number <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="tel"
          name="additionalMobile"
          value={formData.additionalMobile}
          onChange={handleChange}
          placeholder="Enter Mobile Number"
          className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        />
      </div>

      {/* PAN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
        <input
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
          placeholder="Enter PAN"
          className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        />
      </div>

      {/* DOB */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter E-mail"
          className="w-full border border-black rounded px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        />
      </div>

      {/* Referral Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
        <input
          type="text"
          name="referralCode"
          value={formData.referralCode}
          onChange={handleChange}
          placeholder="Referral code"
          className="w-full border border-black bg-gray-100 rounded px-3 py-2 focus:outline-none focus:border-blue-400 transition-colors duration-150"
        />
      </div>
    </div>

    <div className="flex justify-end mt-6">
      <button
        type="button"
        onClick={next}
        className="px-6 py-2 text-white rounded"
        style={{ backgroundColor: "#2095f2" }}
      >
        Continue
      </button>
    </div>
  </div>
)}


{step === 2 && (
  <div className="space-y-10 text-gray-700 bg-gray-50 p-6 rounded border shadow-md max-w-xl mx-auto">
   
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold " style={{ color: "#2095f2" }}>{stepsList[step - 1]}</h2>
      <span className="text-sm text-gray-500 font-medium">Step {step} / 5</span>
    </div>

   
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(step / stepsList.length) * 100}%` }}
      ></div>
    </div>

   
    <div className="border rounded-lg p-4">
      <h3
          className="text-xl font-semibold mb-4 border-b pb-2"
          style={{ color: '#2095f2' }}
        >
          Identity Proof (Upload Scanned Copy):
           </h3>

      <ul className="list-disc list-inside mb-4">
        <li>Passport / Driver’s License / Aadhaar (India) / National ID</li>
        <li>PAN Card (if applicable)</li>
      </ul>

      <div className="flex justify-between items-start gap-4 flex-col md:flex-row">
       
        <div className="md:w-2/3">
          <p className="text-sm text-gray-600 mb-2 font-medium">Bank Terms & Conditions:</p>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
            <li>The document must be government-issued and valid.</li>
            <li>The name must match your bank account details.</li>
            <li>Blurry or cropped documents will be rejected.</li>
          </ul>
        </div>

       
        <div className="md:w-1/3">
          <div className="border-2 border-dashed border-blue-300 p-4 rounded-md flex flex-col items-center justify-center min-h-[180px]">
            <img src={uploadIcon} alt="Upload Icon" className="w-12 h-12 mb-3" />
            <label className="block mb-2 text-sm font-medium text-gray-600 text-center">
              Upload Identity Proof:
             </label>
            <label
                  className="inline-block cursor-pointer px-4 py-2 text-white rounded text-sm font-medium w-full text-center"
                 style={{ backgroundColor: '#2095f2' }}
                >
                     Upload
                  <input
                 type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                 className="hidden"
                 onChange={(e) => console.log("Address file uploaded:", e.target.files[0])}
                    />
                </label>
          </div>
        </div>
      </div>
    </div>

   
    <div className="border rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-blue-700" 
         style={{ color: '#2095f2' }}
      >
        Address Proof (Upload Scanned Copy):
      </h3>
      <ul className="list-disc list-inside mb-4">
        <li>Utility Bill (Electricity/Gas – not older than 3 months)</li>
        <li>Bank Statement / Rental Agreement</li>
      </ul>

      <div className="flex justify-between items-start gap-4 flex-col md:flex-row">
       
        <div className="md:w-2/3">
          <p className="text-sm text-gray-600 mb-2 font-medium">Bank Terms & Conditions:</p>
          <ul className="list-disc list-inside text-sm text-gray-500 space-y-1">
            <li>The address must match your current residence.</li>
            <li>Documents older than 3 months will not be accepted.</li>
            <li>Utility bills must clearly show your name and address.</li>
          </ul>
        </div>

    
        <div className="md:w-1/3">
          <div className="border-2 border-dashed border-blue-300 p-4 rounded-md flex flex-col items-center justify-center min-h-[180px]">
            <img src={uploadIcon} alt="Upload Icon" className="w-12 h-12 mb-3" />
            <label className="block mb-2 text-sm font-medium text-gray-600 text-center">
              Upload Address Proof:
            </label>
            <label
                  className="inline-block cursor-pointer px-4 py-2 text-white rounded text-sm font-medium w-full text-center"
                 style={{ backgroundColor: '#2095f2' }}
                >
                     Upload
                  <input
                 type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                 className="hidden"
                 onChange={(e) => console.log("Address file uploaded:", e.target.files[0])}
                    />
                </label>

          </div>
        </div>
      </div>
    </div>


    <div className="flex justify-between pt-6 border-t">
      <button
        onClick={back}
        className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium"
      >
        Back
      </button>
      <button
        onClick={next}
         className="px-6 py-2 text-white rounded"
           style={{ backgroundColor: "#2095f2" }}
          >
            continue
      </button>
    </div>
  </div>
)}

{step === 3 && (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-10 text-gray-700 max-w-lg mx-auto">
    
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold" style={{ color: "#2095f2" }}>{stepsList[step - 1]}</h2>
      <span className="text-sm text-gray-500 font-medium">Step {step} / {stepsList.length}</span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(step / stepsList.length) * 100}%` }}
      ></div>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber || ""}
          onChange={handleChange}
          placeholder="Enter Account Number"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">IFSC / SWIFT Code</label>
        <input
          type="text"
          name="ifsc"
          value={formData.ifsc || ""}
          onChange={handleChange}
          placeholder="Enter IFSC or SWIFT Code"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name & Branch</label>
        <input
          type="text"
          name="bankBranch"
          value={formData.bankBranch || ""}
          onChange={handleChange}
          placeholder="Enter Bank Name & Branch"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber || ""}
          onChange={handleChange}
          placeholder="Enter Card Number"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY)</label>
        <input
          type="text"
          name="expiry"
          value={formData.expiry || ""}
          onChange={handleChange}
          placeholder="MM/YY"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CVV (3-digit)</label>
        <input
          type="password"
          name="cvv"
          value={formData.cvv || ""}
          onChange={handleChange}
          placeholder="CVV"
          maxLength={3}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
        <input
          type="text"
          name="cardHolder"
          value={formData.cardHolder || ""}
          onChange={handleChange}
          placeholder="Enter Name on Card"
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>

    <div className="flex justify-between pt-6 border-t">
      <button
        type="button"
        onClick={back}
        className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium"
      >
        Back
      </button>
      <button
        type="button"
        onClick={next}
        className="px-6 py-2 text-white rounded"
        style={{ backgroundColor: "#2095f2" }}
      >
        Continue
      </button>
    </div>
  </div>
)}


{step === 4 && (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-10 text-gray-700 max-w-lg mx-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold" style={{ color: "#2095f2" }}>{stepsList[step - 1]}</h2>
      <span className="text-sm text-gray-500 font-medium">Step {step} / {stepsList.length}</span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(step / stepsList.length) * 100}%` }}
      ></div>
    </div>

    <div className="space-y-6">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="aadhaar"
            value={formData.aadhaar || ""}
            onChange={handleChange}
            placeholder="Enter Aadhaar Number"
            className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            className="px-4 py-2 text-white rounded"
             style={{ backgroundColor: '#2095f2' }}
             >
           Send OTP
              </button>

        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar OTP Verification</label>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="aadhaar"
            value={formData.aadhaar || ""}
            onChange={handleChange}
            placeholder="Enter OTP Number"
            className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            className="px-4 py-2 text-white rounded"
             style={{ backgroundColor: '#2095f2' }}
             >
           Verify OTP
              </button>

        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Verification</label>
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            name="panVerification"
            value={formData.panVerification || ""}
            onChange={handleChange}
            placeholder="Enter PAN Number"
            className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Link to Bank
          </button>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Biometric Authentication</p>
        <p className="text-gray-600 mb-2 text-sm">
          Use your fingerprint or iris scan for instant verification.
        </p>
        <button
         className="px-4 py-2 text-white rounded"
             style={{ backgroundColor: '#2095f2' }}
             >
          Launch Biometric Scan
        </button>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Video KYC</p>
        <p className="text-gray-600 mb-2 text-sm">
          Connect with a bank representative for live verification.
        </p>
        <button
         className="px-4 py-2 text-white rounded"
             style={{ backgroundColor: '#2095f2' }}
             >
          Start Video KYC
        </button>
      </div>
    </div>

    <div className="flex justify-between pt-6 border-t">
      <button
        onClick={back}
        className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 font-medium"
      >
        Back
      </button>
      <button
        onClick={next}
         className="px-6 py-2 text-white rounded"
            style={{ backgroundColor: "#2095f2" }}

            >
              continue
      </button>
    </div>
  </div>
)}

{step === 5 && (
  <div className="bg-white rounded-lg shadow-md p-6 space-y-10 text-gray-700 max-w-lg mx-auto">
    
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold " style={{ color: "#2095f2" }}>{stepsList[step - 1]}</h2>
      <span className="text-sm text-gray-500 font-medium">Step {step} / {stepsList.length}</span>
    </div>

    
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(step / stepsList.length) * 100}%` }}
      ></div>
    </div>

    
    <div className="bg-white border rounded p-4">
      <h3 className="font-semibold text-blue-600 mb-2">Your Details</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        <li><strong>Title:</strong> {formData.title}</li>
        <li><strong>Name:</strong> {formData.name}</li>
        <li><strong>Mobile:</strong> {formData.mobile}</li>
        <li><strong>Additional Mobile:</strong> {formData.additionalMobile}</li>
        <li><strong>PAN:</strong> {formData.pan}</li>
        <li><strong>DOB:</strong> {formData.dob}</li>
        <li><strong>Email:</strong> {formData.email}</li>
        <li><strong>Referral Code:</strong> {formData.referralCode}</li>
        
      </ul>
    </div>

    
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">Terms & Conditions</h3>
      <div className="bg-green-100 border border-green-300 text-sm text-gray-800 rounded p-4 space-y-2">
        <p>By submitting this form, you agree to the following:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>All information provided is true and correct to the best of your knowledge.</li>
          <li>You consent to the use of your documents for KYC verification.</li>
          <li>You authorize the bank to contact you for further steps if required.</li>
          <li>You accept the bank’s privacy policy and data handling procedures.</li>
        </ul>
      </div>
    </div>

    <div className="flex items-center">
      <input
        type="checkbox"
        id="agree"
        name="agree"
        className="mr-2"
        required
      />
      <label htmlFor="agree" className="text-sm text-gray-700">
        I have read and agree to the terms and conditions.
      </label>
    </div>

      <div className="flex justify-end mt-6">
      <button
        onClick={() => navigate('/transaction')}
        className="px-6 py-2 text-white rounded"
        style={{ backgroundColor: "#2095f2" }}
      >
        Submit
      </button>
    </div>


  </div>
)}








        
      </div>
    
  );
};

export default TimeValidation;
