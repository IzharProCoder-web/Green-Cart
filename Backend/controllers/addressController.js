// addressController.js
import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, street, city, state, zipcode, country, phone } = req.body;
    const address = await Address.create({ userId, firstName, lastName, email, street, city, state, zipcode, country, phone });
    res.json({ success: true, message: "Address added", address });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.userId });
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};