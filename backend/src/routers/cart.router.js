const router = require("express").Router();
const { addToCart } = require("../controllers/cart.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/add", authenticateUser, addToCart);

module.exports = router;