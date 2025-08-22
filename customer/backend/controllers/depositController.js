const Deposit = require('../models/depositModel');


exports.createDeposit = async (req, res) => {
  try {
    const depositId = await Deposit.createDeposit(req.body);
  res.status(201).json({ id: depositId, message: 'Deposit created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create deposit' });
  }
};


exports.getDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.getDeposits();
    res.json(deposits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch deposits' });
  }
};
