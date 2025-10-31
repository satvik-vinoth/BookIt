import express from "express";
import Experience from "../models/Experience.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });
    res.status(200).json(exp);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experience", error: error.message });
  }
});

export default router;
