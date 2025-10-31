import express from "express";
import Promo from "../models/Promo.js";

const router = express.Router();

router.post("/validate", async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    if (!code || typeof code !== "string")
      return res.status(400).json({ message: "Promo code is required" });

    if (!subtotal || subtotal <= 0)
      return res.status(400).json({ message: "Invalid subtotal value" });

    const promo = await Promo.findOne({ code: code.toUpperCase(), isActive: true });
    if (!promo)
      return res.status(400).json({ message: "Invalid or inactive promo code" });

    let discount = 0;
    if (promo.discountType === "flat") discount = promo.value;
    else if (promo.discountType === "percent") discount = (subtotal * promo.value) / 100;

    if (discount > subtotal)
         discount = subtotal;
    const total = subtotal - discount;

    res.status(200).json({
      valid: true,
      code: promo.code,
      discount,
      newTotal: total,
      message: `Promo code applied successfully`
    });
  } catch (error) {
    console.error("Promo validation error:", error);
    res.status(500).json({
      message: "Error validating promo code",
      error: error.message
    });
  }
});

export default router;
