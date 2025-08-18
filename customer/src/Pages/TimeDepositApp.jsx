import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function TimeDepositApp() {
  // State for the current step in the wizard
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for form data
  const [formData, setFormData] = useState({
    amount: 5000,
    term: 3,
    payoutType: 'atMaturity',
    startDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
  });

  // State for deposits (start empty)
const [deposits, setDeposits] = useState([]);

 // Fetch deposits when component mounts
  useEffect(() => {
    axios.get("http://localhost:5000/api/deposits")
      .then(res => setDeposits(res.data))
      .catch(err => console.error("Error fetching deposits:", err));
  }, []);


  // Selected deposit for "View" page
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  // FAQ data
  const faqs = [
    {
      question: 'What is a time deposit?',
      answer:
        'It\'s a fixed-term savings product where your money earns a set rate until a set date.',
    },
    {
      question: 'Can I withdraw early?',
      answer:
        'In this demo, you can simulate closing early with a simple penalty example.',
    },
    {
      question: 'Is this real?',
      answer:
        'No. This is a demo experience only and does not connect to any bank.',
    },
    {
      question: 'What data is stored?',
      answer:
        'Only demo deposit details stored locally in your browser. You can clear them anytime.',
    },
  ];

  // Calculate maturity date
  const calculateMaturityDate = (startDate, termMonths) => {
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + termMonths);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate projected interest
  const calculateInterest = (amount, term, apy) => {
    const interest = (amount * apy * term) / 1200;
    return interest.toFixed(2);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'amount' || name === 'term' ? Number(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const maturityDate = calculateMaturityDate(new Date(), formData.term);
    const interest = calculateInterest(formData.amount, formData.term, 3.0);
    
    const newDeposit = {
      id: `TD-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      amount: `$${formData.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      term: `${formData.term} mo`,
      apy: '3.00%',
      payoutType: formData.payoutType === 'atMaturity' ? 'At maturity' : 'Monthly payout',
      startDate: formData.startDate,
      maturityDate,
      projectedInterest: `$${interest}`,
      projectedPayout: `$${(formData.amount + parseFloat(interest)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };

     try {
      const response = axios.post("http://localhost:5000/api/deposits", newDeposit);
      setDeposits([...deposits, response.data]);
      setCurrentStep(1);
      setActiveTab("my-deposits");
    } catch (error) {
      console.error("Error creating deposit:", error);
    }
  };
        

  // Toggle FAQ
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Navigation
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-xl font-bold">Time Deposit App</h1>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center space-x-6 p-4 bg-white shadow">
        <button
          onClick={() => {
            setActiveTab("create");
            setSelectedDeposit(null);
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'create' ? 'bg-blue-500 text-white' : 'text-blue-600'
          }`}
        >
          Create Deposit
        </button>
        <button
          onClick={() => {
            setActiveTab("my-deposits");
            setSelectedDeposit(null);
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'my-deposits' ? 'bg-blue-500 text-white' : 'text-blue-600'
          }`}
        >
          My Deposits
        </button>
        <button
         onClick={() => {
            setActiveTab("faq");
            setSelectedDeposit(null);
          }}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'faq' ? 'bg-blue-500 text-white' : 'text-blue-600'
          }`}
        >
          FAQ
        </button>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === "create" && !selectedDeposit && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Create a New Time Deposit</h1>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-6 mb-6">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`h-8 w-8 flex items-center justify-center rounded-full 
                      ${
                        step === currentStep
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                  >
                    {step}
                  </div>
                  {step < 4 && <div className="w-12 h-1 bg-gray-200 mx-2"></div>}
                </div>
              ))}
            </div>

            {/* Form Content */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                {currentStep === 1 && (
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Deposit Amount</h2>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Amount (₹)</label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                        min="100"
                        step="100"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Term Length</h2>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Term (months)</label>
                      <select
                        name="term"
                        value={formData.term}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="1">1 month</option>
                        <option value="3">3 months</option>
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Payout Options</h2>
                    <div className="mb-4">
                      <label className="flex items-center space-x-2 mb-2">
                        <input
                          type="radio"
                          name="payoutType"
                          value="atMaturity"
                          checked={formData.payoutType === 'atMaturity'}
                          onChange={handleInputChange}
                          className="h-4 w-4"
                        />
                        <span>Interest paid at maturity</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="payoutType"
                          value="monthly"
                          checked={formData.payoutType === 'monthly'}
                          onChange={handleInputChange}
                          className="h-4 w-4"
                        />
                        <span>Monthly interest payments</span>
                      </label>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCurrentStep(4)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Review & Confirm</h2>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span>${formData.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Term:</span>
                        <span>{formData.term} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payout Type:</span>
                        <span>
                          {formData.payoutType === 'atMaturity'
                            ? 'At maturity'
                            : 'Monthly payout'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Start Date:</span>
                        <span>{formData.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Maturity Date:</span>
                        <span>
                          {calculateMaturityDate(new Date(), formData.term)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-gray-600">Projected Interest:</span>
                        <span className="text-blue-600">
                          ₹
                          {calculateInterest(
                            formData.amount,
                            formData.term,
                            3.0
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        Confirm Deposit
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Summary */}
              <div className="md:w-80">
                <div className="bg-white shadow-md rounded-2xl p-6 sticky top-6">
                  <h2 className="font-semibold text-lg mb-4">Live Summary</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span>₹{formData.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Term</span>
                      <span>{formData.term} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>APY</span>
                      <span>3.00%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Start</span>
                      <span>{formData.startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maturity</span>
                      <span>
                        {calculateMaturityDate(new Date(), formData.term)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-gray-500">Estimated interest</p>
                    <p className="text-xl font-semibold text-blue-700">
                      $
                      {calculateInterest(formData.amount, formData.term, 3.0)}
                    </p>
                    <p className="text-xs text-gray-400">
                      For demo only. Actual rates may differ.
                    </p>
                  </div>
                  <div className="mt-4 p-3 rounded-md bg-gray-50 text-xs text-gray-600">
                    Heads up: This is a demo. Don't enter sensitive info.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-deposits' && (
          <div className="p-6">
            {!selectedDeposit ? (
              <>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">My Deposits</h1>
              <button
                onClick={() => setActiveTab('create')}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-5 py-2"
              >
                Create New
              </button>
            </div>

            {/* Deposit Cards */}
            {deposits.length === 0 ? (
                  <p className="text-gray-600">No deposits yet.</p>
                ) : (
                  deposits.map((deposit, index) => (
                    <div
                      key={index}
                      className="bg-white shadow-md rounded-2xl p-4 mb-6 border border-gray-100"
                    >
                      {/* Top Section */}
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 font-semibold">
                            ID: {deposit.id}
                          </p>
                          <h2 className="text-xl font-bold text-gray-800">
                            {deposit.amount} for {deposit.term}
                          </h2>
                          <p className="text-gray-500 text-sm">
                            APY {deposit.apy} • {deposit.payoutType}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedDeposit(deposit)}
                          className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-2"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            ) : (
              // Deposit Detail View
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-4">
                  Deposit Details - {selectedDeposit.id}
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Amount:</strong> {selectedDeposit.amount}</li>
                  <li><strong>Term:</strong> {selectedDeposit.term}</li>
                  <li><strong>APY:</strong> {selectedDeposit.apy}</li>
                  <li><strong>Payout Type:</strong> {selectedDeposit.payoutType}</li>
                  <li><strong>Start Date:</strong> {selectedDeposit.startDate}</li>
                  <li><strong>Maturity Date:</strong> {selectedDeposit.maturityDate}</li>
                  <li><strong>Projected Interest:</strong> {selectedDeposit.projectedInterest}</li>
                  <li><strong>Projected Payout:</strong> {selectedDeposit.projectedPayout}</li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedDeposit(null)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg px-4 py-2"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-2xl mx-auto my-10 p-6 bg-white shadow-md rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">FAQ</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  onClick={() => toggleFaq(index)}
                  className="cursor-pointer border rounded-xl p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition"
                >
                  <h3 className="font-medium text-lg text-gray-800">
                    {faq.question}
                  </h3>
                  {openFaqIndex === index && (
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="text-center mt-20">
            <h1 className="text-3xl font-bold text-blue-600">
              Welcome to Time Deposit App
            </h1>
            <p className="mt-4 text-gray-600">
              Manage your deposits with ease.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setActiveTab('create')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Create a Deposit
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

