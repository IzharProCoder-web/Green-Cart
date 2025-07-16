import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 }, // Add min validation
    offerPrice: { type: Number, required: true, min: 0 }, // Add min validation
    image: { type: [String], required: true }, // Specify array of strings
    category: { type: [String], required: true }, // Specify array of strings
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
// export default Product;