import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET_KEY); 
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(403).json({ success: false, message: "Invalid token payload" });
    }
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authSeller;