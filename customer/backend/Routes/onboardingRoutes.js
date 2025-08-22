const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/onboardingController");




console.log("Loaded controller functions:", Object.keys(controller));


router.get("/test", (req, res) => {
  res.json({ msg: "Backend working ✅" });
});


router.post("/step1", controller.registerStep1);
router.post("/step2", controller.registerStep2);
router.post("/send-otp", controller.sendOTP);
router.post("/verify-otp", controller.verifyOTP);
router.post("/address", controller.saveAddress);
router.post(
  "/upload",
  upload.fields([
    { name: "id_file", maxCount: 1 },
    { name: "selfie", maxCount: 1 }
  ]),
  controller.uploadDocuments
);
router.post("/security", controller.setSecurity);
router.post("/submit", controller.finalSubmit);

module.exports = router;
