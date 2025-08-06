const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const onboardingRoutes = require("./routes/onboardingRoutes");
const app = express();

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 60 * 60 * 1000 },
  })
);

app.use(express.json());

// API routes
app.use("/api/onboarding", onboardingRoutes);

// Serve React build folder
app.use(express.static(path.join(__dirname, "../customer/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../customer/dist/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on http://localhost:${port}`));
