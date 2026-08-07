const router = require("express").Router();
const { createUser, loginUser, getUserProfile, updateUserProfile, changePassword } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.put("/change-password", authMiddleware, changePassword);
module.exports = router;
