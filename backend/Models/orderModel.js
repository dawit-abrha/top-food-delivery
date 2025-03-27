import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type: 'string',
        required: true
    },
    items:{
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address:{
        type: Object,
        required: true,
    },
    status:{
        type: String,
        default: 'processing',
    },
    date:{
        type: Date,
        default: Date.now,
        required: true,
    },
    payment:{
        type:Boolean,
        default: false,
        required: true,
    }
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)

export default orderModel;