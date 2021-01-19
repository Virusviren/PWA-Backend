require("dotenv").config();

const express = require("express");
const cors = require("cors");
const databaseConnection = require("./database/db");

const app = express();

// Database Connection
databaseConnection();

// CORS Headers
app.use(
  cors({
    origin: "*",
    methods: "POST",
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);

// Middleware Initialization
app.use(express.json({ extended: false }));

// API Routes
app.use("/api/user", require("./routes/user/user"));
app.use("/api/admin", require("./routes/admin/admin"));

// Hosted Port or Localhost
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
