import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiLoader } from 'react-icons/fi';

const TransactionCard = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Account: '',
    confirmToAccountNumber: '',
    bankName: '',
    ifscCode: '',
    beneficiaryName: '',
    transactionType: '',
    amount: '',
    remarks: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTransactionId(`TRX${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="text-center space-y-4">
          <FiCheckCircle className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800">Transaction Successful!</h2>
          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-gray-600">Reference:</span>
              <span className="font-medium">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">₹{formData.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">To:</span>
              <span>{formData.beneficiaryName || formData.toAccount}</span>
            </div>
          </div>

          <div className="pt-6 flex justify-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#2095f2" }}>
        Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Bank Name"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transaction Type
            </label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:border-[#2095f2] focus:ring-[#2095f2]"
            >
              <option value="">Select Type</option>
              <option value="NEFT">NEFT</option>
              <option value="RTGS">RTGS</option>
              <option value="IMPS">IMPS</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <InputField
            label="Account Number"
            name="toAccount"
            value={formData.toAccount}
            onChange={handleChange}
          />

          <InputField
            label="Confirm Account Number"
            name="confirmToAccountNumber"
            value={formData.confirmToAccountNumber}
            onChange={handleChange}
          />

          <InputField
            label="IFSC Code"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
          />

          <InputField
            label="Beneficiary Name"
            name="beneficiaryName"
            value={formData.beneficiaryName}
            onChange={handleChange}
          />

          <InputField
            label="Amount (₹)"
            name="amount"
            type="number"
            min="1"
            value={formData.amount}
            onChange={handleChange}
          />

          {/* Remarks */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purpose
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="3"
              placeholder="Optional notes"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2095f2] focus:border-[#2095f2]"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center">
  <button
    type="submit"
    disabled={isSubmitting}
    style={{ backgroundColor: '#2095f2' }}
    className={`px-6 py-2 text-white rounded-md transition-colors flex items-center ${
      isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:opacity-90'
    }`}
  >
    {isSubmitting ? (
      <>
        <FiLoader className="animate-spin mr-2" />
        Processing...
      </>
    ) : (
      'Submit Transaction'
    )}
  </button>

  <button
    type="button"
    onClick={() => navigate('/BeneficiaryDetails')} 
    className="ml-4 px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
  >
    Continue
  </button>
</div>

      </form>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  min,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className="w-full p-2 border rounded-md focus:outline-none focus:border-[#2095f2] focus:ring-0 border-gray-300"
    />
  </div>
);

export default TransactionCard;
