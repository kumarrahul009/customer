const express = require("express");
const router = express.Router();
const depositController = require("../controllers/depositController");

router.get('/', depositController.getDeposits);

router.post('/', depositController.createDeposit);

module.exports = router;
