const router = require("express").Router();
const { createUser } = require("../controllers/users.controller");

router.post("/register", createUser);

module.exports = router;