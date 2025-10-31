import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  promoCode: { type: String },
  subtotal: { type: Number, required: true },
  taxes: { type: Number },
  total: { type: Number, required: true },
  status: { type: String, enum: ["confirmed", "failed"], default: "confirmed" },
  bookingRef: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
