"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import ExperienceCard from "@/components/ExperienceCard";
import Loader from "@/components/Loader";

interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
}

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filtered, setFiltered] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/experiences");
        setExperiences(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to load experiences:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(experiences);
      return;
    }

    const results = experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(query) ||
        exp.location.toLowerCase().includes(query)
    );
    setFiltered(results);
  };

  return (
    <main className="w-full min-h-screen bg-[#f8f8f8]">
      <Navbar onSearch={handleSearch} />

      <section className="flex flex-wrap mt-12 pb-[32px] px-[124px] gap-[24px]">
        {loading ? (
          <Loader />
        ) : filtered.length > 0 ? (
          filtered.map((exp) => <ExperienceCard key={exp._id} {...exp} />)
        ) : (
          <p className="text-gray-600 text-center w-full">
            No experiences found.
          </p>
        )}
      </section>
    </main>
  );
}
