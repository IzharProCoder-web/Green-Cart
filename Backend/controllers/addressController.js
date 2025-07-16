// addressController.js
import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.userId; // Assume authUser middleware sets req.user
    await Address.create({ ...address, userId });
    res.json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message || "An error occurred" });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.userId; // Use req.user from middleware
    const addresses = await Address.find({ userId });
    res.json({ success: true, message: "Addresses retrieved successfully", data: addresses });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message || "An error occurred" });
  }
};