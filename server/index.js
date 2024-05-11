import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import  connectMongoDb  from './db/connectMongoDB.js'
import messageRouter from './routes/message.route.js'

const app=express()
dotenv.config()
const port=process.env.PORT || 8000;



// app.get('/',(req,res)=>{
//     res.send("gi")
// })
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)


app.listen(port,()=>{
    connectMongoDb()
    console.log(`server is running on port ${port}`)
})