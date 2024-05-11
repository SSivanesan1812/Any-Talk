import express from 'express'
import { verifyUser } from '../middleware/verifyUser.js';
import { sendMessage } from '../controllers/message.controller.js';

const messageRouter=express.Router()

messageRouter.post('/send/:id',verifyUser,sendMessage);

export default messageRouter;