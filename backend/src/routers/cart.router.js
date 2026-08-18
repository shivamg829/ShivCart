const router = require("express").Router();
const { addToCart, getCart, updateCart,deleteFromCart, clearCart } = require("../controllers/cart.controller");
const authenticateUser = require("../middlewares/auth.middleware");

router.post("/add", authenticateUser, addToCart);
router.get("/", authenticateUser, getCart);
router.put("/update/:productId", authenticateUser, updateCart);
router.delete("/remove/:productId", authenticateUser, deleteFromCart);
router.delete("/clear", authenticateUser, clearCart);
module.exports = router;