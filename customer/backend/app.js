const express = require("express");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const onboardingRoutes = require("./Routes/onboardingRoutes");
const depositRoutes = require("./Routes/depositRoutes");
const errorHandler = require("./middleware/errorMiddleware");


const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", 
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

app.use("/api/onboarding", onboardingRoutes);
app.use("/api/deposits", depositRoutes);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, "../customer/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../customer/dist/index.html"));
});

app.post("/api/deposits", (req, res) => {
  console.log("Received:", req.body);
  res.json({ success: true, data: req.body });
});

app.use(express.static(path.join(__dirname, "customer", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "customer", "dist", "index.html"));
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(` App running at http://localhost:${port}`);
});
