import mongoose from "mongoose";

const conversatinSchema=mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            
        }
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'message',
            default:[]
        }
    ]
},{timestamps:true})

const Conversation=mongoose.model("Conversation",conversatinSchema)
export default Conversation;