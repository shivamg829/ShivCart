const router = require("express").Router();
const { createUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware.authenticateUser, getUserProfile);
router.put("/profile", authMiddleware.authenticateUser, updateUserProfile);
router.put("/change-password", authMiddleware.authenticateUser, changePassword);
module.exports = router;
