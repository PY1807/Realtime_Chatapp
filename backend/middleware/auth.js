const jwt=require("jsonwebtoken");
const {User}=require("../models/User");
require("dotenv").config();

exports.protectedRoute = async (req,res,next)=>
{
  try{
    const token=req.cookies.jwt;
    if(!token)
    {
      return res.status(401).json(
        {
          success:false,
          message:"Unauthorized - No token provided"
        }
      )
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded)
    {
      return res.status(401).json({success:false,
        message: "Unauthorized - Incorrect token has been sent"
      })
    }
     
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();

  }
  catch(err)
  {
   console.error(err);
   res.status(500).json({
    sucess:false,
    message:"Internal server error"
   })
  }
}
