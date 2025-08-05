const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");
const orderRoutes = require("./routes/order.routes");
const { verifyToken } = require("./middleware/auth.middleware");
const User = require("./models/user.model"); // Ensure this path is correct

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await createDefaultAdmin(); // Create admin after DB is ready
  })
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/auth", authRoutes);
app.use("/food", verifyToken, foodRoutes);
app.use("/orders", verifyToken, orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

/**
 * ✅ Function to create default admin on first run
 */
async function createDefaultAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@tiffin.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("bhowate@1991", 10);
      await User.create({
        name: "Admin",  
        email: "admin@tiffin.com",
        passwordHash: hashedPassword, // ✅ Match your User schema field
        role: "admin",
      });
      console.log("✅ Default admin created");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
}
