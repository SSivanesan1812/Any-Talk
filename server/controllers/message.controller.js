import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async(req,res)=>{
    try {
        const {message}=req.body;
        const recieverId=req.params.id;
        const userId=req.user._id;
    
        let conversation=await Conversation.findOne({
            participants:{
                $all:[userId,recieverId]
            }
            
        })
    
        if(!conversation){
            conversation=Conversation.create({
                participants:[userId,recieverId]
            })
        }
    
        const newMessage=await Message.create({
            senderId:userId,
            recieverId:recieverId,
            message:message
        })
        if(!newMessage){
            return res.status(400).json("New message is not created")
        }

        await conversation.messages.push(newMessage._id);
    
        await conversation.save();
        await newMessage.save();
    
        return res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sending Messsage",error.message);
        return res.status(400).json({error:"Internal Server Error"})
    }

}