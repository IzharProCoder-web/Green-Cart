import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id; 
    } else {
      return res.json({ success: false, message: "Invalid token payload" });
    }
    next();
  } catch (err) {
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;