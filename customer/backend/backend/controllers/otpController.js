const { saveOtp, verifyOtpCode } = require('../models/OTP');
const { generateOtp } = require('../utils/otpGenerator');
const smsService = require('../utils/smsService');

exports.sendOtp = (req, res) => {
  const otp = generateOtp();
  saveOtp(req.body.mobile, otp);
  smsService.sendMessage(req.body.mobile, `Your OTP is ${otp}`);
  res.json({ message: 'OTP sent' });
};

exports.verifyOtp = (req, res) => {
  verifyOtpCode(req.body.mobile, req.body.otp, (valid) => {
    if (!valid) return res.status(400).json({ error: 'Invalid OTP' });
    res.json({ message: 'OTP verified' });
  });
};
