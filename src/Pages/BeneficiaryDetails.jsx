import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import SelectField from './SelectField';

const BeneficiaryDetails = ({ onContinue }) => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/loan-application"); 
  };

  const [formData, setFormData] = useState({
    name: '',
    bankName: '',
    branch: '',
    accountNumber: '',
    ifsc: '',
    swift: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = () => {
  console.log('Beneficiary data:', formData);
  if (onContinue) {
    onContinue(formData);
  } else {
    navigate('/loan-application');
  }
};

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 border">
      <h2 className="text-2xl font-bold text-blue-600 mb-6"style={{ color: "#2095f2" }}>Beneficiary Details</h2>

      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter beneficiary name"
      />

      <InputField
        label="Bank Name"
        name="bankName"
        value={formData.bankName}
        onChange={handleChange}
        placeholder="Enter bank name"
      />

      <InputField
        label="Branch"
        name="branch"
        value={formData.branch}
        onChange={handleChange}
        placeholder="Enter branch"
      />

      <InputField
        label="Account Number"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleChange}
        placeholder="Enter account number"
      />

      <InputField
        label="IFSC Code (optional)"
        name="ifsc"
        value={formData.ifsc}
        onChange={handleChange}
        placeholder="Enter IFSC code"
      />

      <InputField
        label="SWIFT Code"
        name="swift"
        value={formData.swift}
        onChange={handleChange}
        placeholder="Enter SWIFT code (optional)"
      />

      <SelectField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={['Pending', 'Verified']}
      />

     <button
      onClick={handleSubmit}
      className="w-full mt-4 py-2 px-4 hover:brightness-110 text-white font-semibold rounded transition"
      style={{ backgroundColor: "#2095f2" }}
    >
      Continue
    </button>

    </div>
  );
};

export default BeneficiaryDetails;
