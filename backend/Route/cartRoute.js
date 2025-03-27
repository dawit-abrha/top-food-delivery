import express from 'express';
import { addToCart,removeFromCart,getCart } from '../Controllers/cartController.js';
import autheMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',autheMiddleware ,addToCart);
cartRouter.post('/remove',autheMiddleware ,removeFromCart);
cartRouter.post('/get',autheMiddleware ,getCart);



export default cartRouter;