const express = require("express");
const router = express.Router();
const {
  registerUser,
  verifyOTP,
  loginUser,
} = require("../controllers/userController");
const multer = require("multer");

// Multer configuration for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/profile_pictures/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
}); // 2MB limit

router.post("/image/upload", upload.single("imgFile"), (req, res) => {
  console.log(req.file);
  return res.status(200).json({
    url: `http://localhost:8000/${req.file.path.replace("public\\", "")}`,
  });
});

router.post("/registeruser", registerUser);
router.post("/verifyotp", verifyOTP);
router.post("/login", loginUser);

module.exports = router;
