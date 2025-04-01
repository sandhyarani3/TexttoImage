import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from "./routes/imageRoutes.js"
const PORT=process.env.PORT || 4000
//if port number is available in the enviornment it will use that else use 4000
const app=express()
app.use(express.json())
app.use(cors())
await connectDB()
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
//localhost:4000/api/user/register whenver we hit this the register in userRouter get execute
app.get('/',(req,res)=>res.send("API Working"))
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))