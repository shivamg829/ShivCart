const productsController = require("../controllers/products.controller");
const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware");
const authorizeRoles = require("../middlewares/authRole.middleware");

router.post(
  "/",
  authMiddleware,
  authorizeRoles(["admin"]),
  productsController.createProduct,
);

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getProductById);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  productsController.updateProduct,
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles(["admin"]),
  productsController.deleteProduct,
);

module.exports = router;
