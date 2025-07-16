import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";


export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    // Validate required fields
    if (!req.files || req.files.length === 0) {
      return res.json({ success: false, message: "At least one image is required" });
    }
    if (!productData.name || !productData.description || !productData.category || !productData.price || !productData.offerPrice) {
      return res.json({ success: false, message: "All fields are required" });
    }
    if (productData.price < 0 || productData.offerPrice < 0) {
      return res.json({ success: false, message: "Price and offer price must be non-negative" });
    }

    // Fix category and description for schema compatibility
    productData.category = Array.isArray(productData.category) ? productData.category : [productData.category];
    productData.description = Array.isArray(productData.description) ? productData.description.join('\n') : productData.description;

    const images = req.files;
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        try {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (uploadError) {
          console.error(`Failed to upload image: ${uploadError.message}`);
          return null; // Handle individual upload failures
        }
      })
    );

    // Filter out failed uploads
    imagesUrl = imagesUrl.filter((url) => url !== null);
    if (imagesUrl.length === 0) {
      return res.json({ success: false, message: "Failed to upload any images" });
    }

    await Product.create({ ...productData, image: imagesUrl });
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error, message });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.params; // Fix: Use req.params instead of req.body
    const product = await Product.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    res.json({ success: false, message: error, message });
  }
};
