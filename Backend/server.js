import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/UserRoutes.js";
import sellerRouter from "./routes/sellersRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
const app = express();
const Port = process.env.PORT;

await connectCloudinary();

//allow multiple origin
const allowedOrigins = [
  "https://your-frontend-app.com",
  "http://localhost:3000",
];

// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true, // Update with deployed URL later
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Api is working ");
});

app.listen(Port || 4000, () => {
  connectDB();
  console.log(`Server Is Running On Port http://localhost:${Port}`);
});
