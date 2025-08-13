const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const onboardingRoutes = require("./routes/onboardingRoutes");
app.use("/api/onboarding", onboardingRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
