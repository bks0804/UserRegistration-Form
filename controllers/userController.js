const User = require("../models/userModel");
const { sendOTP } = require("../services/emailService");
const { generateOTP } = require("../utils/otpGenerator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      address: { street, city, state, country, postalCode },
      profilePicture,
    } = req.body;

    // console.log(req.body);

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Validate password and phone number (use validate.js)
    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    console.log(req.body);

    user = new User({
      fullName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      address: {
        street,
        city,
        state,
        country,
        postalCode,
      },
      profilePicture,
      otp,
      otpExpires,
    });
    await user.save();
    console.log(user);
    // Send OTP via email
    sendOTP(email, otp);
    res.status(200).json({
      message: "OTP sent to email. Verify to activate your account.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    // console.log(user);
    if (!user || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Account verified. You can now log in." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ message: "Invalid credentials or account not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
