import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanApplication = () => {

    const navigate = useNavigate();

 const [step, setStep] = useState(1); 
const [formData, setFormData] = useState({
  fullName: '',
  loanAmount: '',
  loanType: '',
  purpose: '',
  incomeProof: null,
  contractProof: null,
});
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleContinue = () => {
    setStep(2);
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl space-y-6">
{step === 1 && (
  <>
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Loan Application Details</h2>

    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label className="block font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
      </div>

      {/* Loan Amount */}
      <div>
        <label className="block font-medium text-gray-700">Loan Amount</label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
      </div>

      {/* Loan Type */}
      <div>
        <label className="block font-medium text-gray-700">Loan Type</label>
        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        >
          <option value="">Select</option>
          <option value="Personal">Personal Loan</option>
          <option value="Home">Home Loan</option>
          <option value="Education">Education Loan</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700">Pan Number</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block font-medium text-gray-700">Aadhar Number</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
      </div>

      

      

      {/* Purpose */}
      <div>
        <label className="block font-medium text-gray-700">Purpose</label>
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="E.g., Medical expenses, education, etc."
          className="mt-1 w-full border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
        />
      </div>

      {/* Document Submission Section */}
      <div className="mt-6 flex justify-between gap-6">
        {/* Left Side - Document Submission Points */}
        <div className="w-1/2 space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Document Submission </h3>
          <ul className="list-decimal ml-6 text-gray-800 font-semibold space-y-1">
            <li className="font-bold">Income Proof</li>
            {/* <li className="font-bold">Customer Signs Loan Contract (with Terms & EMI)</li> */}
          </ul>
        </div>

        {/* Right Side - Upload with Icon */}
        <div className="w-1/2 bg-gray-100 border rounded-lg flex flex-col items-center justify-center p-6 space-y-4">
          {/* Icon Below Upload */}
          <div className="text-4xl text-blue-500">🏦</div>

          {/* Upload Button */}
          <label className="cursor-pointer inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded shadow">
            Upload
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

     
    </div>

    <button
      onClick={handleContinue}
      className="w-full mt-6 py-2 px-4 bg-[#2095f2] hover:bg-blue-700 text-white font-semibold rounded transition"
    >
      Continue
    </button>
  </>
)}

{step === 2 && (
  <>
    <h2 className="text-2xl font-bold text-blue-600 mb-4">
      Terms & EMI Confirmation
    </h2>

    {/* Card */}
    <div className="bg-white shadow-md rounded-lg p-6 border max-w-3xl">
      {/* Terms */}
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Terms & Conditions</h3>
      <ul className="list-disc ml-5 space-y-2 text-sm text-gray-700">
        <li>EMI is calculated based on the interest rate and tenure selected.</li>
        <li>Payments must be made before the due date every month.</li>
        <li>Late payments will incur a penalty charge.</li>
        <li>Loan pre-closure can be requested after 6 months with applicable fees.</li>
      </ul>

      {/* EMI Details */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">EMI Details</h3>
        <p className="text-sm text-gray-700">
          Your calculated EMI is:{" "}
          <span className="font-bold text-green-600">
            ₹{formData.emi || "0"}
          </span>{" "}
          / month
        </p>
      </div>

      {/* Final verification checkbox */}
      <div className="mt-6 flex items-start gap-2">
        <input
          type="checkbox"
          id="step2-verify"
          className="mt-1 accent-green-600"
          checked={formData.step2Verify || false}
          onChange={(e) =>
            setFormData({ ...formData, step2Verify: e.target.checked })
          }
        />
        <label
          htmlFor="step2-verify"
          className="text-sm text-gray-800 cursor-pointer"
        >
          I have read and agree to the above terms and EMI details.
        </label>
      </div>
    </div>

    {/* Continue Button */}
    <div className="flex justify-end mt-6">
     <button
      onClick={() => setStep(3)} // This will take user directly to Step 3
      className="w-full mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
    >
      Continue
    </button>

    </div>
  </>
)}


{step === 3 && (
  <>
    <h2 className="text-2xl font-bold text-blue-600 mb-4">
      Loan Details Verification
    </h2>

    {/* Terms & Conditions
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Terms & Conditions
      </h3>
      <div className="h-40 overflow-y-scroll border rounded px-4 py-3 bg-green-50 text-sm leading-relaxed text-gray-700 shadow-inner">
        <ul className="list-disc ml-4 space-y-2">
          <li>Loan amount is subject to verification of submitted documents.</li>
          <li>Interest rates may vary based on credit score and income proof.</li>
          <li>All EMI payments must be made before the 5th of each month.</li>
          <li>Failure to repay on time may result in penalties or legal action.</li>
          <li>Loan pre-closure is allowed after 6 months with applicable charges.</li>
          <li>Bank reserves the right to reject any application without explanation.</li>
          <li>Customer must provide accurate and truthful information.</li>
          <li className="flex items-start gap-2">
            <input
              type="checkbox"
              id="final-verify"
              className="mt-1 accent-green-600"
            />
            <label htmlFor="final-verify" className="cursor-pointer">
              Verify
            </label>
          </li>
        </ul>
      </div>
    </div> */}

    {/* Loan Details Form */}
    <div className="max-w-4xl space-y-4 mt-6">
      {/* Loan ID */}
      <div>
        <label className="block font-medium text-gray-700">Loan ID</label>
        <input
          type="text"
          name="loanId"
          value={formData.loanId}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Loan Type */}
      <div>
        <label className="block font-medium text-gray-700">Loan Type</label>
        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select</option>
          <option value="Personal">Personal Loan</option>
          <option value="Home">Home Loan</option>
          <option value="Education">Education Loan</option>
        </select>
      </div>

      {/* Principal Amount */}
      <div>
        <label className="block font-medium text-gray-700">Principal Amount</label>
        <input
          type="number"
          name="principalAmount"
          value={formData.principalAmount}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Interest Rate */}
      <div>
        <label className="block font-medium text-gray-700">Interest Rate (%)</label>
        <input
          type="number"
          step="0.01"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Tenure */}
      <div>
        <label className="block font-medium text-gray-700">Tenure (in months)</label>
        <input
          type="number"
          name="tenure"
          value={formData.tenure}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* EMI */}
      <div>
        <label className="block font-medium text-gray-700">EMI</label>
        <input
          type="number"
          name="emi"
          value={formData.emi}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select</option>
          <option value="Pending">Pending</option>
          <option value="Verified">Verified</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Verify Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Approve
        </button>
      </div>
    </div>
  </>
)}


      </div>
    </div>
  );
};

export default LoanApplication;
