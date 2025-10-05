import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    // Calculate Amount Using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "cod",
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Failed to place order",
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId; // Fix destructuring
    const orders = await Order.find({
      userId, // Use the correct userId
      $or: [{ paymentType: "cod" }, { isPaid: true }], // Changed "COD" to lowercase "cod"
    })
      .populate({
        path: "items.product",
        model: "Product", // Explicitly specify model
      })
      .populate({
        path: "address",
        model: "Address", // Explicitly specify model
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: { $regex: /^cod$/i } }, { isPaid: true }],
    })
      .populate({
        path: "items.product",
        model: "Product", // Explicitly specify model
      })
      .populate({
        path: "address",
        model: "Address", // Explicitly specify model
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};
