const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const onboardingRoutes = require("./routes/onboardingRoutes");
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend port (Vite default)
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "yourSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
  })
);

// ✅ Register API routes BEFORE React build serving
app.use("/api/onboarding", onboardingRoutes);

// ✅ Serve frontend build (after all APIs)
app.use(express.static(path.join(__dirname, "../customer/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../customer/dist/index.html"));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ App running at http://localhost:${port}`);
});
