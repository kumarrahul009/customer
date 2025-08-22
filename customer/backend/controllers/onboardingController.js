const bcrypt = require("bcryptjs");
const customerModel = require('../models/customerModel');
const twilio = require("twilio");
require('dotenv').config();


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


exports.registerStep1 = async (req, res) => {
  const { email, password, confirmPassword, agreed } = req.body;

  
  if (!email || !password || !confirmPassword || !agreed) {
    return res
      .status(400)
      .json({ msg: "Email, password, confirm password, and agreement are required" });
  }

   if (password !== confirmPassword)
    return res.status(400).json({ msg: "❌ Password and Confirm Password do not match" });
  

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format" });
  }


  const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (!strongPass.test(password)) {
    return res.status(400).json({
      msg:
        "Password must contain upper, lower, number, special char and be at least 8 characters long",
    });
  }



  req.session.email = email;
  req.session.password = await bcrypt.hash(password, 10);
  req.session.agreed = true;

  return res.json({ msg: "Step 1 success" });
};

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

exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ msg: "Invalid mobile number" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  
  req.session.otp = otp;
  req.session.mobile = mobile;

  const formattedNumber = `+91${mobile}`;

  try {
    // 
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, 
      to: formattedNumber,
    });

    console.log("OTP sent via Twilio SID:", message.sid);
    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error(" Twilio send error:", err.message);
    res.status(500).json({ msg: "Failed to send OTP" });
  }
};



exports.verifyOTP = (req, res) => {
  const { otp } = req.body;

  if (!otp) return res.status(400).json({ msg: "OTP is required" });
  if (Number(otp) !== req.session.otp)
    return res.status(400).json({ msg: "Invalid OTP" });

  res.json({ msg: "OTP verified" });
};


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



exports.setSecurity = (req, res) => {
  const { securityQuestion, securityAnswer } = req.body;

  console.log("📥 Received security data:", { securityQuestion, securityAnswer });

  // Validate both fields
  if (!securityQuestion || !securityAnswer) {
    console.warn(" Missing security question or answer");
    return res.status(400).json({ msg: "Security question and answer required" });
  }

  // Save in session so later steps can access it
  req.session.securityQuestion = securityQuestion;
  req.session.securityAnswer = securityAnswer;

  console.log(" Security step saved in session:", req.session.securityQuestion);

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
// exports.finalSubmit = async (req, res) => {
//   try {
//     console.log("Received final submit data:", req.body);
//     const result = await customerModel.saveCustomer(req.body);
//     res.json({ success: true, result });
//   } catch (err) {
//     console.error("❌ Final submit server error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };


// ✅ Final submit handler
// exports.finalSubmit = async (req, res) => {
//   try {
//     const sessionData = req.session.onboarding || {};

//     // Merge request body just in case
//     const finalData = {
//       ...sessionData,
//       ...req.body,
//     };

//     // Ensure required fields exist
//     if (!finalData.email || !finalData.password) {
//       return res.status(400).json({
//         success: false,
//         msg: "Email and password are required",
//       });
//     }

//     // Save customer to DB
//     const result = await customerModel.saveCustomer(finalData);

//     res.json({
//       success: true,
//       msg: "Customer saved successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.error("❌ Final submit error:", error);
//     res.status(500).json({
//       success: false,
//       msg: "Error saving data",
//       error: error.message,
//     });
//   }
// };

const { saveCustomer } = require("../models/customerModel");

exports.finalSubmit = async (req, res) => {
  try {
 
    if (!req.session.email || !req.session.password) {
      return res.status(400).json({
        success: false,
        msg: "Session expired. Please restart onboarding.",
      });
    }

   
    const finalData = {
      email: req.session.email,
      password: req.session.password, //
      full_name: req.body.full_name || req.session.full_name,
      dob: req.body.dob || req.session.dob,
      gender: req.body.gender || req.session.gender,
      mobile: req.body.mobile || req.session.mobile,
      city: req.session.city,
      state: req.session.state,
      postal: req.session.postal,
      country: req.session.country,
      address1: req.session.address1,
      address2: req.session.address2,
      id_file: req.session.id_file,
      selfie: req.session.selfie,
      security_question: req.session.security_question,
      security_answer: req.session.security_answer,
      is_2fa: req.session.is_2fa,
      agreed: req.session.agreed,
    };

   
    const customerId = await saveCustomer(finalData);

    
    req.session.destroy();

    return res.json({
      success: true,
      msg: "Customer saved successfully",
      customerId,
    });

  } catch (error) {
    console.error("❌ Final submit error:", error);
    res.status(500).json({
      success: false,
      msg: "Error saving data",
      error: error.message,
    });
  }
};
