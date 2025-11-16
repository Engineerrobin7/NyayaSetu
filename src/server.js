const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const authRoutes = require("./routes/auth");
const lawyerRoutes = require("./routes/lawyers");
const bookingRoutes = require("./routes/bookings");
const paymentRoutes = require("./routes/payments");
const chatRoutes = require("./routes/chat");
const reviewRoutes = require("./routes/reviews");
const documentRoutes = require("./routes/documents");
const adminRoutes = require("./routes/admin");
const notificationRoutes = require("./routes/notifications");
const availabilityRoutes = require("./routes/availability");

console.log("🔍 Registering Routes...");

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:3000",  
    credentials: true
}));

// ✅ Connect API Routes
app.use("/api/auth", authRoutes);
app.use("/api/lawyers", lawyerRoutes);  
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/availability", availabilityRoutes);

sequelize.sync()
    .then(() => console.log("✅ Database Synced!"))
    .catch((err) => console.error("❌ Database Sync Failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
