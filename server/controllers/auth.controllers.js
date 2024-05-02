import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signIn=async(req,res)=>{
    res.send("Sign In")
}

export const signUp=async(req,res)=>{
    try {
        const {fullname,username,password,confirmpassword,gender}=req.body;
        if(password!==confirmpassword){
            return res.status(400).json("Passwords do not match")
        }

        const user=await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username aldready exists"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        const profilepicBoy=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const profilepicGirl=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser= new User({
            fullname,
            username,
            password:hashedPassword,
            gender,
            profilePic:gender==="male"?profilepicBoy:profilepicGirl
        })
        if(newUser){

            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save()
        res.status(200).json(
            {
                _id:newUser._id,
                fullname:newUser.fullname,
                username:newUser.username,
                profilePic:newUser.profilePic   
            }
        )
        
        }
        else{
            res.status(400).json({error:"Invalid Data"})
        }


        
        
    } catch (error) {
        console.log(error.message)
        console.log(error);
        return res.status(500).json({error:"Internal Server error"})
    }


}

export const signOut=async(req,res)=>{
    res.send("sign Out")
}