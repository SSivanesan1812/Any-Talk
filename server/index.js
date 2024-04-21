import express from 'express'
import dotenv from 'dotenv'

const app=express()
dotenv.config()
const port=process.env.PORT || 8000;



app.get('/',(req,res)=>{
    res.send("gi")
})

app.listen(port,()=>console.log(`server is running on port ${port}`))