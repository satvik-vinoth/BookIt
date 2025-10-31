import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "./models/Experience.js";
import Promo from "./models/Promo.js";
import connectDB from "./config/db.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    await Experience.deleteMany();
    await Promo.deleteMany();
    console.log("Cleared existing data...");

    const commonDates = [
      { date: "2025-10-22" },
      { date: "2025-10-23" },
      { date: "2025-10-24" },
      { date: "2025-10-26" }
    ];

    const commonSlots = [
      { time: "07:00 am", seatsLeft: 5 },
      { time: "09:00 am", seatsLeft: 3 },
      { time: "11:00 am", seatsLeft: 4 },
      { time: "01:00 pm", seatsLeft: 2 }
    ];

    const generateDates = () =>
      commonDates.map(d => ({
        date: d.date,
        slots: JSON.parse(JSON.stringify(commonSlots)) 
      }));

    const experiences = [
      {
        title: "Kayaking",
        location: "Udupi, Karnataka",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included.",
        about:
          "Enjoy kayaking through scenic backwaters of Udupi. Includes helmets, life jackets, and guided briefing.",
        price: 999,
        imageUrl:
          "https://images.unsplash.com/photo-1569965335962-2317ff2a7658?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=438",
        availableDates: generateDates()
      },
      {
        title: "Nandi Hills Sunrise",
        location: "Bangalore",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included.",
        about:
          "Watch the sunrise from Nandi Hills with professional guides, transportation, and light refreshments.",
        price: 899,
        imageUrl:
          "https://images.unsplash.com/photo-1646733627981-d8f10c929024?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=873",
        availableDates: generateDates()
      },
      {
        title: "Coffee",
        location: "Coorg",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included.",
        about:
          "Visit the Coorg coffee estates and learn about coffee harvesting, roasting, and brewing with local farmers.",
        price: 1299,
        imageUrl:
          "https://images.unsplash.com/photo-1560357647-62a43d9897bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29vcmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
        availableDates: generateDates()
      },
      {
        title: "Kayaking",
        location: "Udupi, Karnataka",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included.",
        about:
          "Peaceful kayaking in river stretches of Udupi with safety gears and certified instructors.",
        price: 999,
        imageUrl:
          "https://images.unsplash.com/photo-1480480565647-1c4385c7c0bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1031",
        availableDates: generateDates()
      },
      {
        title: "Nandi Hills Sunrise",
        location: "Bangalore",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included.",
        about:
          "Witness breathtaking sunrise views from Nandi Hills followed by a peaceful nature walk and local breakfast.",
        price: 899,
        imageUrl:
          "https://images.unsplash.com/photo-1577174696285-05315444c73f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
        availableDates: generateDates()
      },
      {
        title: "Boat Cruise",
        location: "Sunderban",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included.",
        about:
          "Sail through mangrove forests on a comfortable cruise with expert local guides and refreshments.",
        price: 999,
        imageUrl:
          "https://images.unsplash.com/photo-1722031671305-4940bbba29bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=928",
        availableDates: generateDates()
      },
      {
        title: "Bunjee Jumping",
        location: "Manali",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included.",
        about:
          "Leap into adventure with bungee jumping from the Manali cliffs. Full safety gear and instructors included.",
        price: 999,
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1663013514560-a30fbd137865?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=388",
        availableDates: generateDates()
      },
      {
        title: "Coffee Trail",
        location: "Coorg",
        description:
          "Curated small-group experience. Certified guide. Safety first with gear included.",
        about:
          "Explore scenic coffee plantations, learn the process from bean to cup, and enjoy a guided tasting.",
        price: 1299,
        imageUrl:
          "https://images.unsplash.com/photo-1600896304061-7d318ec7e395?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
        availableDates: generateDates()
      }
    ];

    const promos = [
      { code: "SAVE10", discountType: "percent", value: 10, isActive: true },
      { code: "FLAT100", discountType: "flat", value: 100, isActive: true }
    ];

    await Experience.insertMany(experiences);
    await Promo.insertMany(promos);

    console.log("All 8 experiences (including duplicates) + promo codes inserted successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
