import express from "express";
import { upload } from "../configs/multer.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productControllers.js";
import authSeller from "../middlewares/authSeller.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("images"), authSeller, addProduct); // Fix: Use string 'images'
productRouter.get("/list", authSeller, productList); // Add authSeller if needed
productRouter.get("/:id", authSeller, productById); // Fix: Use URL parameter
productRouter.post("/stock", authSeller, changeStock);

export default productRouter;