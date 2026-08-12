const router = require("express").Router();
const { addToCart, getCart, updateCart } = require("../controllers/cart.controller");
const authenticateUser = require("../middlewares/auth.middleware");

router.post("/add", authenticateUser, addToCart);
router.get("/", authenticateUser, getCart);
router.put("/update/:productId", authenticateUser, updateCart);
module.exports = router;