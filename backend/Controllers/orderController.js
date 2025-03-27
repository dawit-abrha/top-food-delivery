import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing an order
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:3000";
    
    try {
        const { userId, items, amount, address } = req.body;

        // Create a new order entry (payment pending)
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            payment: false,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Stripe Payment Processing
        const line_items = items.map((item) => ({
            price_data: {
                currency: 'ETB',
                product_data: { name: item.name },
                unit_amount: Math.round(item.price * 100), // ETB to cents conversion
            },
            quantity: item.quantity
        }));

        // Adding delivery fee
        line_items.push({
            price_data: {
                currency: 'ETB',
                product_data: { name: 'Delivery Fee' },
                unit_amount: Math.round(2 * 100), // Delivery charge
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log("Error placing order:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Verifying order after payment
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed, order deleted" });
        }
    } catch (error) {
        console.log("Error verifying order:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get orders for a specific user
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// List all orders for admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error listing orders:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Admin updates order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });

        // If order is delivered, delete it after confirmation
        if (status === "Delivered") {
            setTimeout(async () => {
                await orderModel.findByIdAndDelete(orderId);
                console.log(`Order ${orderId} deleted after delivery`);
            }, 86400000); // Deletes after 30 seconds (adjustable)
        }

        res.json({ success: true, message: "Status updated successfully" });
    } catch (error) {
        console.log("Error updating status:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus
};
