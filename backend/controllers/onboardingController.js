const bcrypt = require("bcryptjs");
const { saveCustomer } = require("../models/customerModel");

let sessionData = {}; // simulate session

// ✅ STEP 1 – Email, Password, Agreement
exports.registerStep1 = async (req, res) => {
  const { email, password, agreed } = req.body;
  if (!email || !password || !agreed)
    return res.status(400).json({ msg: "Invalid input" });

  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (!strong.test(password))
    return res.status(400).json({ msg: "Weak password" });

  sessionData.email = email;
  sessionData.password = await bcrypt.hash(password, 10);
  sessionData.agreed = agreed;
  res.json({ msg: "Step 1 success" });
};

// ✅ STEP 2 – Personal Info
exports.registerStep2 = async (req, res) => {
  const { full_name, dob, gender } = req.body;
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  if (age < 18) return res.status(400).json({ msg: "Must be 18+" });

  sessionData.full_name = full_name;
  sessionData.dob = dob;
  sessionData.gender = gender;
  res.json({ msg: "Step 2 success" });
};

// ✅ STEP 3 – Simulated OTP Sender
exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  sessionData.mobile = mobile;
  sessionData.otp = otp;

  console.log(`🔐 Simulated OTP for ${mobile}: ${otp}`); // Simulated "SMS"

  res.json({ msg: "OTP sent successfully (simulated)" });
};

// ✅ STEP 4 – OTP Verification
exports.verifyOTP = (req, res) => {
  const { otp } = req.body;
  if (Number(otp) === sessionData.otp) {
    res.json({ msg: "OTP verified" });
  } else {
    res.status(400).json({ msg: "Invalid OTP" });
  }
};

// ✅ STEP 5 – Address
exports.saveAddress = (req, res) => {
  const { address1, address2, city, state, postal, country } = req.body;
  sessionData = { ...sessionData, address1, address2, city, state, postal, country };
  res.json({ msg: "Address saved" });
};

// ✅ STEP 6 – File Upload (ID & Selfie)
exports.uploadDocuments = (req, res) => {
  const idFile = req.files["id_file"]?.[0];
  const selfie = req.files["selfie"]?.[0];

  sessionData.id_file = idFile.buffer.toString("base64");
  sessionData.selfie = selfie.buffer.toString("base64");

  res.json({ msg: "Files uploaded" });
};

// ✅ STEP 7 – 2FA Security Question
exports.setSecurity = (req, res) => {
  const { question, answer } = req.body;
  sessionData.security_question = question;
  sessionData.security_answer = answer;
  sessionData.is_2fa = true;
  res.json({ msg: "2FA configured" });
};

// ✅ STEP 8 – Final Submit (Save to DB, Simulate SMS)
exports.finalSubmit = async (req, res) => {
  const id = await saveCustomer(sessionData);

  // Simulated welcome message
  console.log(`📨 Simulated Welcome: "Welcome to ABCD Bank! Your account #${id} has been created." sent to ${sessionData.mobile}`);

  res.json({ msg: "Submitted", userId: id });
};
