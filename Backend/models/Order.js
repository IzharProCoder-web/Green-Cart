import mongoose from "mongoose";

// Example Order schema
const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    amount: Number,
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    paymentType: String,
    isPaid: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
const Order = mongoose.models.order || mongoose.model("order", orderSchema);
export default Order;
