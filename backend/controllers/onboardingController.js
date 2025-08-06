const bcrypt = require("bcryptjs");
const { saveCustomer } = require("../models/customerModel");

// ---------- STEP 1 – Email, Password, Agreement ----------
exports.registerStep1 = async (req, res) => {
  const { email, password, agreed } = req.body;

  if (!email || !password || !agreed)
    return res
      .status(400)
      .json({ msg: "Email, password, and agreement required" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return res.status(400).json({ msg: "Invalid email format" });

  const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  if (!strongPass.test(password))
    return res.status(400).json({
      msg: "Password must contain upper, lower, number, special char and be 8+ chars",
    });

  req.session.email = email;
  req.session.password = await bcrypt.hash(password, 10);
  req.session.agreed = true;

  res.json({ msg: "Step 1 success" });
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
exports.sendOTP = (req, res) => {
  const { mobile } = req.body;

  if (!mobile) return res.status(400).json({ msg: "Mobile number required" });
  if (!/^\d{10}$/.test(mobile))
    return res.status(400).json({ msg: "Mobile number must be 10 digits" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  req.session.mobile = mobile;
  req.session.otp = otp;

  console.log(`🔐 OTP for ${mobile}: ${otp}`);
  res.json({ msg: "OTP sent (simulated)" });
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

  res.json({ msg: "Address saved" });
};

// ---------- STEP 6 – File Upload (ID & Selfie) ----------
exports.uploadDocuments = (req, res) => {
  const idFile = req.files?.["id_file"]?.[0];
  const selfie = req.files?.["selfie"]?.[0];

  if (!idFile || !selfie)
    return res.status(400).json({ msg: "ID proof and selfie are required" });

  req.session.id_file = idFile.buffer.toString("base64");
  req.session.selfie = selfie.buffer.toString("base64");

  res.json({ msg: "Files uploaded" });
};

// ---------- STEP 7 – Security Question ----------
exports.setSecurity = (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer)
    return res
      .status(400)
      .json({ msg: "Security question and answer required" });

  req.session.security_question = question;
  req.session.security_answer = answer;
  req.session.is_2fa = true;

  res.json({ msg: "2FA configured" });
};

// ---------- STEP 8 – Final Submit ----------
exports.finalSubmit = async (req, res) => {
  try {
    const id = await saveCustomer(req.session);

    console.log(
      `📨 Welcome SMS: "Welcome! Your account #${id} is active." sent to ${req.session.mobile}`
    );

    req.session.destroy(() => {
      res.json({ msg: "Form submitted successfully", userId: id });
    });
  } catch (err) {
    res.status(500).json({ msg: "Error saving data", error: err.message });
  }
};
