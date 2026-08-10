const router = require("express").Router();
const { addToCart } = require("../controllers/cart.controller");
const { authenticateUser, getCart } = require("../middlewares/auth.middleware");

router.post("/add", authenticateUser, addToCart);
router.get("/", authenticateUser, getCart);
module.exports = router;