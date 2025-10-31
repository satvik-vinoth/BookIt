import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  discountType: { type: String, enum: ["flat", "percent"], required: true },
  value: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

export default mongoose.model("Promo", promoSchema);
