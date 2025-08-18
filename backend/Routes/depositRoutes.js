const express = require("express");
const router = express.Router();
const depositController = require("../controllers/depositController");

// GET all deposits
router.get('/', depositController.getDeposits);

// POST new deposit
router.post('/', depositController.createDeposit);


module.exports = router;
