import express from 'express';
import cors from 'cors';
import connectDB from './Config/db.js';
import foodRouter from './Route/foodroute.js';
import userRouter from './Route/userRoute.js';
import 'dotenv/config.js'
import cartRouter from './Route/cartRoute.js';
import orderRouter from './Route/orderRoute.js';




//app config
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());


//db connection
connectDB();

//api endpoints


app.use('/api/food',foodRouter)
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get('/',(req,res)=>{
    res.send('Hello from the server')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})