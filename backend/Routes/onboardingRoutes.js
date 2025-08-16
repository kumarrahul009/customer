const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const controller = require("../controllers/onboardingController");

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
// Debug log to confirm controller loaded
console.log("Loaded controller functions:", Object.keys(controller));

// Test route
router.get("/test", (req, res) => {
<<<<<<< HEAD
  res.json({ msg: "Onboarding API is working" });
});

// Routes for each step
=======
  res.json({ msg: "Backend working ✅" });
});

// Routes for each step
=======
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
router.post("/step1", controller.registerStep1);
router.post("/step2", controller.registerStep2);
router.post("/send-otp", controller.sendOTP);
router.post("/verify-otp", controller.verifyOTP);
router.post("/address", controller.saveAddress);
<<<<<<< HEAD

=======
<<<<<<< HEAD
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
router.post(
  "/upload",
  upload.fields([
    { name: "id_file", maxCount: 1 },
<<<<<<< HEAD
    { name: "selfie", maxCount: 1 },
  ]),
  controller.uploadDocuments
);

=======
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
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
router.post("/security", controller.setSecurity);
router.post("/submit", controller.finalSubmit);

module.exports = router;
