const express = require("express");
const { checkAuth, login, logout, signup, updateProfile } = require("../controllers/Auth.js");
const protect = require("../middleware/auth.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protect.protectedRoute, updateProfile);

router.get("/check", protect.protectedRoute, checkAuth);

module.exports = router;
