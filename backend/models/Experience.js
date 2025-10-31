import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  time: { type: String, required: true },
  seatsLeft: { type: Number, required: true },
  isSoldOut: { type: Boolean, default: false }
});

const dateSchema = new mongoose.Schema({
  date: { type: String, required: true },
  slots: [slotSchema]
});

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  about: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  availableDates: [dateSchema],
});

export default mongoose.model("Experience", experienceSchema);
