<<<<<<< HEAD
const bcrypt = require("bcryptjs");
const { saveCustomer } = require("../models/customerModel");
=======
<<<<<<< HEAD
const bcrypt = require("bcryptjs");
const { saveCustomer } = require("../models/customerModel");

// STEP 1
exports.registerStep1 = async (req, res) => {
  console.log("Step 1 Body:", req.body);
  const { email, password, agreed } = req.body;
  if (!email || !password || !agreed)
    return res.status(400).json({ msg: "Invalid input" });

  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (!strong.test(password))
    return res.status(400).json({ msg: "Weak password" });

  req.session.email = email;
  req.session.password = await bcrypt.hash(password, 10);
  req.session.agreed = agreed;

  console.log("Session after step1:", req.session);
  res.json({ msg: "Step 1 success" });
};

// ... (keep rest of your steps as they are)
=======
const { saveOtp, verifyOtpCode } = require('../models/OTP');
const { generateOtp } = require('../utils/otpGenerator');
const smsService = require('../utils/smsService');
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f

// STEP 1
exports.registerStep1 = async (req, res) => {
  console.log("Step 1 Body:", req.body);
  const { email, password, agreed } = req.body;
  if (!email || !password || !agreed)
    return res.status(400).json({ msg: "Invalid input" });

  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (!strong.test(password))
    return res.status(400).json({ msg: "Weak password" });

  req.session.email = email;
  req.session.password = await bcrypt.hash(password, 10);
  req.session.agreed = agreed;

  console.log("Session after step1:", req.session);
  res.json({ msg: "Step 1 success" });
};

<<<<<<< HEAD
// ... (keep rest of your steps as they are)
=======
exports.verifyOtp = (req, res) => {
  verifyOtpCode(req.body.mobile, req.body.otp, (valid) => {
    if (!valid) return res.status(400).json({ error: 'Invalid OTP' });
    res.json({ message: 'OTP verified' });
  });
};
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
