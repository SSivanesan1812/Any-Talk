import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.js'
import  connectMongoDb  from './db/connectMongoDB.js'

const app=express()
dotenv.config()
const port=process.env.PORT || 8000;



app.get('/',(req,res)=>{
    res.send("gi")
})

app.use('/api/auth',authRouter)

app.listen(port,()=>{
    connectMongoDb()
    console.log(`server is running on port ${port}`)
})