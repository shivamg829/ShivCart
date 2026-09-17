const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./src/routers/users.router");
const productRoutes = require("./src/routers/products.router");
const cartRoutes = require("./src/routers/cart.router");
const orderRoutes = require("./src/routers/order.router");
const app = express();
dotenv.config();

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};
connectDB();
app.get('/', (req, res) => {
    res.send("Hello from ShivCart Backend");
});
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});