const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/onboardingController");

<<<<<<< HEAD
// Debug log to confirm controller loaded
console.log("Loaded controller functions:", Object.keys(controller));

// Test route
router.get("/test", (req, res) => {
  res.json({ msg: "Backend working ✅" });
});

// Routes for each step
=======
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
router.post("/step1", controller.registerStep1);
router.post("/step2", controller.registerStep2);
router.post("/send-otp", controller.sendOTP);
router.post("/verify-otp", controller.verifyOTP);
router.post("/address", controller.saveAddress);
<<<<<<< HEAD
router.post(
  "/upload",
  upload.fields([
    { name: "id_file", maxCount: 1 },
    { name: "selfie", maxCount: 1 }
  ]),
  controller.uploadDocuments
);
=======
router.post("/upload", upload.fields([
  { name: "id_file", maxCount: 1 },
  { name: "selfie", maxCount: 1 },
]), controller.uploadDocuments);
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
router.post("/security", controller.setSecurity);
router.post("/submit", controller.finalSubmit);

module.exports = router;
