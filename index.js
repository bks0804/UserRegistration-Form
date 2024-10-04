require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");
const app = express();
const PORT = 8000;
var bodyParser = require("body-parser");
const cors = require("cors");

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
connectDB();

// Set 'public' folder as static
app.use(express.static(path.join(__dirname, "public")));

//api routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// app listen
app.listen(PORT, () => {
  console.log(`Server is running on : ${PORT}`);
});
