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


