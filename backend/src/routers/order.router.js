const router = require("express").Router();
const {
  createOrder,
  getOrdersByUserId,
  getOrderById,
  cancelOrder,
} = require("../controllers/order.controller");
const { authenticateUser } = require("../middlewares/auth.middleware");

router.post("/orders", authenticateUser, createOrder);
router.get("/orders", authenticateUser, getOrdersByUserId);
router.get("/orders/:id", authenticateUser, getOrderById);
router.delete("/orders/:id", authenticateUser, cancelOrder);
router.get("/admin", authenticateUser, authorizeRoles(["admin"]), getAllOrders);
router.put(
  "/:id/status",
  authenticateUser,
  authorizeRoles(["admin"]),
  updateOrderStatus,
);
module.exports = router;
