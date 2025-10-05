import jwt from 'jsonwebtoken'


export const sellerLogin = async (req,res) => {
   try {
     const {email, password } = req.body 

    if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
        const token = jwt.sign({email}, process.env.JWT_SECRET_KEY, {expiresIn:'7d'})
        res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

     return res
      .status(201)
      .json({ success: true,message :"Logged In " });
    }else {
        return res.json({ success: false, message : "invalid credentials"  });
    }
   }catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
}


export const isSellerrAuth = async (req, res) => {
  try {
      return res.json({ success: false });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};