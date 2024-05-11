import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const verifyUser=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
    
        if(!token){
            return res.status(400).json("Token not found")
        }
    
        const detoken=jwt.verify(token,process.env.JWT_SECRET)
    
        if(!detoken){
            return res.status(400).json("Unauthorised token")
        }
    
        const user=await User.findById(detoken.userId)
        if(!user){
            res.status(400).json({error:"User not found"})
        }
    
        req.user=user;
        next();
    } catch (error) {
        console.log("Error in verifying token",error.message);
        return res.status(400).json({error:"Internal Server error"})
    }

}