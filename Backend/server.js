import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// MongoDB Connection
// ----------------------
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/bookit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// ----------------------
// Schemas & Models
// ----------------------
const SlotSchema = new mongoose.Schema({
  date: String,
  time: String,
  isBooked: { type: Boolean, default: false },
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  price: Number,
  image: String,
  slots: [SlotSchema],
});

const BookingSchema = new mongoose.Schema({
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience" },
  name: String,
  email: String,
  date: String,
  time: String,
  pricePaid: Number,
  promoCode: String,
});

const PromoSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  discountPercent: Number,
});

const Experience = mongoose.model("Experience", ExperienceSchema);
const Booking = mongoose.model("Booking", BookingSchema);
const Promo = mongoose.model("Promo", PromoSchema);

// ----------------------
// API Routes
// ----------------------

// Get all experiences
app.get("/experiences", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single experience details + available slots
app.get("/experiences/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Validate promo code
app.post("/promo/validate", async (req, res) => {
  const { code } = req.body;
  try {
    const promo = await Promo.findOne({ code: code.toUpperCase() });
    if (!promo) return res.status(400).json({ valid: false, message: "Invalid code" });
    res.json({ valid: true, discountPercent: promo.discountPercent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create booking
app.post("/bookings", async (req, res) => {
  const { experienceId, name, email, date, time, promoCode } = req.body;
  try {
    const exp = await Experience.findById(experienceId);
    if (!exp) return res.status(404).json({ message: "Experience not found" });

    // Find slot
    const slot = exp.slots.find((s) => s.date === date && s.time === time);
    if (!slot) return res.status(400).json({ message: "Invalid slot" });
    if (slot.isBooked) return res.status(400).json({ message: "Slot already booked" });

    // Apply promo code if valid
    let pricePaid = exp.price;
    if (promoCode) {
      const promo = await Promo.findOne({ code: promoCode.toUpperCase() });
      if (promo) pricePaid = pricePaid - (pricePaid * promo.discountPercent) / 100;
    }

    // Mark slot as booked
    slot.isBooked = true;
    await exp.save();

    // Save booking
    const booking = new Booking({
      experienceId,
      name,
      email,
      date,
      time,
      pricePaid,
      promoCode,
    });
    await booking.save();

    res.json({ 
      success: true,
      message: "Booking successful", 
      bookingId: booking._id,  
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// Server Start
// ----------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
