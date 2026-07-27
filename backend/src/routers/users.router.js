const router = require("express").Router();
const { createUser, loginUser, getUserProfile } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware.authenticateUser, getUserProfile);

module.exports = router;
