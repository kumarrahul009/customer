const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const session = require("express-session");
const path = require("path");
=======
<<<<<<< HEAD
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
=======
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
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

<<<<<<< HEAD
// Serve React build folder
app.use(express.static(path.join(__dirname, "../customer/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../customer/dist/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on http://localhost:${port}`));
=======
app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
>>>>>>> 22d4bf18720eb98cd0bf8110265cf65cc72ddfad
>>>>>>> 46802584a7abdcd0b65d8a32bf746a6ed8b8a09f
