import express from "express";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";
import { v4 as uuidv4 } from "uuid";


const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      userName,
      email,
      experienceId,
      date,
      time,
      quantity,
      promoCode,
      subtotal,
      taxes,
      total
    } = req.body;

    if (!userName || !email || !experienceId || !date || !time)
      return res.status(400).json({ message: "Missing required fields" });

    if (!email.includes("@") || !email.includes("."))
      return res.status(400).json({ message: "Invalid email format" });

    if (quantity <= 0)
      return res.status(400).json({ message: "Quantity must be at least 1" });

    if (subtotal <= 0 || total <= 0)
      return res.status(400).json({ message: "Invalid price values" });

    const experience = await Experience.findById(experienceId);
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    const dateObj = experience.availableDates.find(d => d.date === date);
    if (!dateObj)
      return res.status(400).json({ message: "Invalid date selected" });

    const slot = dateObj.slots.find(s => s.time === time);
    if (!slot)
      return res.status(400).json({ message: "Invalid time slot selected" });

    if (slot.isSoldOut || slot.seatsLeft < quantity)
      return res.status(400).json({ message: "Slot unavailable or sold out" });

    slot.seatsLeft -= quantity;
    if (slot.seatsLeft <= 0) 
        slot.isSoldOut = true;

    await experience.save();

    const bookingRef = uuidv4().split("-")[0].toUpperCase();

    const booking = await Booking.create({
      userName: userName.trim(),
      email: email.trim(),
      experienceId,
      date,
      time,
      quantity,
      promoCode: promoCode?.trim() || null,
      subtotal,
      taxes,
      total,
      bookingRef
    });

    return res.status(201).json({
      success: true,
      message: "Booking successful",
      booking
    });
  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({
      message: "Server error while creating booking",
      error: error.message
    });
  }
});

export default router;
