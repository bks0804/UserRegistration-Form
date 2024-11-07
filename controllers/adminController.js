const User = require("../models/userModel");

// View all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -otp -otpExpires"); // Exclude password and OTP fields
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const userById = await User.findById(id);

    if (!userById) {
      return res.status(401).json({ message: "user not found" });
    }

    return res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user details (admin only)
exports.updateUser = async (req, res) => {
  try {
    // console.log("hit");
    console.log(req.body);
    const { id } = req.params;
    const {
      fullName,
      phoneNumber,
      email,
      address: { street, city, state, country, postalCode },
    } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        phoneNumber,
        email,
        address: { street, city, state, country, postalCode },
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Search users by name or email
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find(
      {
        $or: [
          { fullName: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      },
      "-password -otp -otpExpires"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
