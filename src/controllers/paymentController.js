require("dotenv").config();
const Razorpay = require("razorpay");

// Check if API keys are available
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("❌ Razorpay API keys are missing! Please check your .env file.");
    process.exit(1);  // Stop execution if keys are missing
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount provided" });
        }

        const options = { amount: amount * 100, currency: "INR", payment_capture: 1 };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("❌ Razorpay Order Creation Failed:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
};
