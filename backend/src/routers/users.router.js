const router = require("express").Router();
const { createUser } = require("../controllers/users.controller");

router.post("/register", createUser);
router.post("/login", loginUser);

module.exports = router;