const router = require("express").Router();
const { createOrder, getOrdersByUserId, getOrderById } = require("../controllers/order.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/orders", authenticateUser, createOrder);
router.get("/orders", authenticateUser, getOrdersByUserId);
router.get("/orders/:id", authenticateUser, getOrderById);

module.exports = router;