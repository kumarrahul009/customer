const bcrypt = require("bcryptjs");
const { saveCustomer } = require("../models/customerModel");
<<<<<<< HEAD
const twilio = require("twilio");
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// ---------- STEP 1 – Email, Password, Agreement ----------
exports.registerStep1 = async (req, res) => {
  const { email, password, confirmPassword, agreed } = req.body;

  // ✅ Required fields
  if (!email || !password || !confirmPassword || !agreed) {
    return res
      .status(400)
      .json({ msg: "Email, password, confirm password, and agreement are required" });
  }
  // ✅ Confirm password match
   if (password !== confirmPassword)
    return res.status(400).json({ msg: "❌ Password and Confirm Password do not match" });
  
  // ✅ Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }

  // ✅ Strong password
  const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (!strongPass.test(password)) {
    return res.status(400).json({
      msg:
        "Password must contain upper, lower, number, special char and be at least 8 characters long",
    });
  }


  // ✅ Save to session
  req.session.email = email;
  req.session.password = await bcrypt.hash(password, 10);
  req.session.agreed = true;

  return res.json({ msg: "Step 1 success" });
};

// ---------- STEP 2 – Personal Info ----------
exports.registerStep2 = (req, res) => {
  const { full_name, dob, gender } = req.body;

  if (!full_name || !dob || !gender)
    return res.status(400).json({ msg: "All personal details are required" });

  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  if (age < 18)
    return res.status(400).json({ msg: "You must be at least 18 years old" });

  req.session.full_name = full_name;
  req.session.dob = dob;
  req.session.gender = gender;

  res.json({ msg: "Step 2 success" });
};

// ---------- STEP 3 – Send OTP ----------
exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;

  // 1️⃣ Validate 10-digit number
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ msg: "Invalid mobile number" });
  }

  // 2️⃣ Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP + mobile in session
  req.session.otp = otp;
  req.session.mobile = mobile;

  // 3️⃣ Format number with +91 for Twilio
  const formattedNumber = `+91${mobile}`;

  try {
    // 4️⃣ Send SMS via Twilio
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio's SMS-enabled number
      to: formattedNumber,
    });

    console.log("✅ OTP sent via Twilio SID:", message.sid);
    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Twilio send error:", err.message);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
};


// ---------- STEP 4 – Verify OTP ----------
exports.verifyOTP = (req, res) => {
  const { otp } = req.body;

  if (!otp) return res.status(400).json({ msg: "OTP is required" });
  if (Number(otp) !== req.session.otp)
    return res.status(400).json({ msg: "Invalid OTP" });

  res.json({ msg: "OTP verified" });
};

// ---------- STEP 5 – Address ----------
exports.saveAddress = (req, res) => {
  const { address1, address2, city, state, postal, country } = req.body;

  if (!address1 || !city || !state || !postal || !country)
    return res.status(400).json({ msg: "All address fields are required" });

  if (!/^\d{5,6}$/.test(postal))
    return res.status(400).json({ msg: "Postal code must be 5–6 digits" });

  Object.assign(req.session, {
    address1,
    address2: address2 || "",
    city,
    state,
    postal,
    country,
  });

  res.json({ msg: "addressLine" });
};

// ---------- STEP 6 – File Upload (ID & Selfie) ----------
exports.uploadDocuments = (req, res) => {
  if (!req.files || !req.files.id_file || !req.files.selfie) {
    return res.status(400).json({ msg: "Please upload both ID and selfie" });
  }

  const idFile = req.files.id_file[0];
  const selfieFile = req.files.selfie[0];

  console.log("ID file:", idFile.originalname);
  console.log("Selfie file:", selfieFile.originalname);

  res.json({ msg: "Documents uploaded successfully" });
};


// ---------- STEP 7 – Security Question ----------
exports.setSecurity = (req, res) => {
  const { securityQuestion, securityAnswer } = req.body;

  console.log("📥 Received security data:", { securityQuestion, securityAnswer });

  // Validate both fields
  if (!securityQuestion || !securityAnswer) {
    console.warn("⚠️ Missing security question or answer");
    return res.status(400).json({ msg: "Security question and answer required" });
  }

  // Save in session so later steps can access it
  req.session.securityQuestion = securityQuestion;
  req.session.securityAnswer = securityAnswer;

  console.log("✅ Security step saved in session:", req.session.securityQuestion);

  return res.json({ msg: "Security step saved successfully" });
};

// exports.setSecurity = (req, res) => {
//   const { puzzleVerified } = req.body;

//   if (!puzzleVerified) {
//     return res.status(400).json({ msg: "Puzzle verification failed" });
//   }

//   // Save puzzle verification in session
//   req.session.is2FA = true;

//   return res.json({ msg: "Puzzle verification success" });
// };


// exports.setSecurity = async (req, res) => {
//   const { securityQuestion, securityAnswer } = req.body;
//   const email = req.session.email; // Assuming Step 1 stored email in session

//   console.log("📥 Received security data:", { securityQuestion, securityAnswer, email });

//   if (!securityQuestion || !securityAnswer) {
//     console.warn("⚠️ Missing security question or answer");
//     return res.status(400).json({ msg: "Security question and answer required" });
//   }

//   if (!email) {
//     console.warn("⚠️ No email found in session");
//     return res.status(400).json({ msg: "Session expired. Please restart onboarding." });
//   }

//   try {
//     // Save to MySQL
//     const sql = `
//       UPDATE customers 
//       SET security_question = ?, security_answer = ? 
//       WHERE email = ?
//     `;
//     const [result] = await db.query(sql, [securityQuestion, securityAnswer, email]);

//     if (result.affectedRows === 0) {
//       console.error("❌ No customer found with email:", email);
//       return res.status(404).json({ msg: "Customer not found" });
//     }

//     // Save in session too (optional)
//     req.session.securityQuestion = securityQuestion;
//     req.session.securityAnswer = securityAnswer;

//     console.log("✅ Security step saved in DB for:", email);
//     return res.json({ msg: "Security step saved successfully" });

//   } catch (err) {
//     console.error("❌ MySQL error during security step:", err);
//     return res.status(500).json({ msg: "Server error while saving security step" });
//   }
// };

// ---------- STEP 8 – Final Submit ----------
exports.finalSubmit = async (req, res) => {
  try {
    console.log("📥 Session data:", req.session);
    console.log("📥 Body data:", req.body);

    const data = {
      email: req.body.email || req.session.email,
      password: req.body.password || req.session.password,
      full_name: req.body.full_name || req.session.full_name,
      dob: req.body.dob || req.session.dob,
      gender: req.body.gender || req.session.gender,
      mobile: req.body.mobile || req.session.mobile,
      city: req.body.city || req.session.city,
      state: req.body.state || req.session.state,
      postal: req.body.postal || req.session.postal,
      country: req.body.country || req.session.country,
      address1: req.body.address1 || req.session.address1,
      address2: req.body.address2 || req.session.address2,
      id_file: req.session.id_file,
      selfie: req.session.selfie,
      security_question: req.body.security_question || req.session.security_question,
      security_answer: req.body.security_answer || req.session.security_answer,
      is_2fa: req.session.is_2fa || 0,
      is_2fa_verified: req.session.is_2fa_verified || 0,
      agreed: req.body.agreed || req.session.agreed || 0
    };

    console.log("📤 Saving customer data:", data);

    const customerId = await saveCustomer(data);

    res.json({ success: true, msg: "Final submission complete", customerId });
  } catch (err) {
    console.error("❌ Final submit DB error:", err);
    res.status(500).json({
      success: false,
      msg: "Error saving data",
      error: err.sqlMessage || err.message
    });
  }
=======

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
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
};
