const express=require("express");
const protect =require("../middleware/auth.js");
const { getMessages, getUsersForSidebar, sendMessage } =require( "../controllers/Messagehandler.js");

const router = express.Router();

router.get("/users", protect.protectedRoute, getUsersForSidebar);
router.get("/:id", protect.protectedRoute, getMessages);

router.post("/send/:id", protect.protectedRoute, sendMessage);

module.exports = router;
