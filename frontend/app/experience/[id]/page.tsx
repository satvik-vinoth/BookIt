"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/lib/api";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

interface Slot {
  time: string;
  seatsLeft: number;
  isSoldOut: boolean;
}

interface DateOption {
  date: string;
  slots: Slot[];
}

interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  about: string;
  price: number;
  imageUrl: string;
  availableDates: DateOption[];
}

export default function ExperienceDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const TAX_RATE = 0.06;

  useEffect(() => {
    async function fetchExperience() {
      try {
        const res = await api.get(`/experiences/${id}`);
        setExperience(res.data);
        setSelectedDate(res.data.availableDates?.[0]?.date || null);

      } catch (err) {
        console.error("Failed to load experience:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExperience();
  }, [id]);

  if (loading) return <Loader />;
  if (!experience)
    return (
      <div className="text-center mt-20 text-gray-600">
        Experience not found.
      </div>
    );

  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes;

  const handleConfirm = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time slot!");
      return;
    }

    router.push(
      `/checkout?expId=${experience._id}&date=${selectedDate}&time=${selectedSlot.time}&qty=${quantity}`
    );
  };

  const currentDateObj = experience.availableDates.find(
    (d) => d.date === selectedDate
  );

  return (
    <main className="bg-[#f9f9f9] min-h-screen pb-10">
      <Navbar onSearch={() => {}} />

      <div className="flex gap-2 items-center px-6 sm:px-24 mt-6 text-sm text-gray-700">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-[#000000] text-[14px] leading-[18px] hover:text-black transition cursor-pointer font-inter"
        >
          <span className="w-[20px] h-[20px] flex items-center">←</span> Details
        </button>
      </div>

      <section className="flex flex-col lg:flex-row gap-10 px-6 sm:px-24 mt-8">
        <div className="flex-1 flex flex-col gap-8">
          <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow">
            <Image
              src={experience.imageUrl}
              alt={experience.title}
              fill
              className="object-cover"
              sizes="(max-width: 765px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-inter text-medium text-[24px] leading-[32px] text-[#161616] min-h-[32px]">
                {experience.title}
              </h1>
              <p className="text-[#6C6C6C] text-inter text-[16px] leading-[24px]">{experience.description}</p>
            </div>

            <div className="flex flex-col gap-[24px]">
              <div>
                <h2 className="text-[18px] text-inter font-medium mb-3 text-[#161616]">Choose date</h2>
                <div className="flex flex-wrap gap-3">
                  {(experience.availableDates || []).map((d, idx) => (
                    <button
                      key={`${d.date}-${idx}`}
                      onClick={() => {
                        setSelectedDate(d.date);
                        setSelectedSlot(null);
                      }}
                      className={`px-4 py-2 rounded border text-sm cursor-pointer ${
                        selectedDate === d.date
                          ? "bg-[#ffd643] border-[#ffd643] text-[#161616] text-[14px] rounded-[4px]"
                          : "border-[#BDBDBD] text-[#838383]  text-[14px]  rounded-[4px] hover:border-[#ffd643] "
                      }`}
                    >
                      {new Date(d.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && currentDateObj && (
                <div className="flex flex-col gap-[12px]">
                  <h2 className="text-[18px] font-medium text-[#161616]">Choose time</h2>
                  <div className="flex flex-col gap-[12px]">
                    <div className="flex flex-wrap gap-3">
                      {(currentDateObj.slots || []).map((slot, idx) => (
                        <button
                          key={`${slot.time}-${idx}`}
                          onClick={() => !slot.isSoldOut && setSelectedSlot(slot)}
                          disabled={slot.isSoldOut}
                          className={`px-4 py-2 rounded border text-sm flex items-center gap-2 cursor-pointer ${
                            slot.isSoldOut
                              ? "bg-[#CCCCCC] text-[#CCCCCC] cursor-not-allowed"
                              : selectedSlot?.time === slot.time
                              ? "bg-[#ffd643] border-[#ffd643] text-black"
                              : "border-[#BDBDBD] text-[#838383] hover:border-[#ffd643]"
                          }`}
                        >
                          {slot.time}{" "}
                          {slot.isSoldOut ? (
                            <span className="text-xs text-gray-500">Sold out</span>
                          ) : (
                            <span className="text-xs text-orange-600">
                              {slot.seatsLeft} left
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-[12px] text-[#838383] leading-[16px]">
                      All times are in IST (GMT +5:30)
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-[12px]">
                <h2 className="text-[18px] font-medium text-[#161616]">About</h2>
                <div className="bg-[#EEEEEE] text-[12px] text-[#838383] rounded-[4px] px-[12px] py-[8px] leading-[16px]">
                  {experience.about ||
                    "Scenic routes, trained guides, and safety briefing. Minimum age 10."}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-[387px] bg-[#EFEFEF] p-[24px] rounded-[12px] gap-[24px] flex flex-col self-start shadow w-full ">
          <div className="flex flex-col gap-[16px]">
            <div className="flex justify-between">
              <span className="text-[#656565] text-[16px] leading-[20px]">Starts at</span>
              <span className="text-[#161616] text-[14px] font-medium leading-[20px]">
                ₹{experience.price}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#656565] text-[16px] leading-[20px]">Quantity</span>
              <div className="flex items-center gap-3 text-[#161616]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
                >
                  -
                </button>
                <span className="text-[12px] leading-[14px]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-[#656565] text-[16px] leading-[20px]">Subtotal</span>
              <span className="text-[#161616] text-[14px] font-medium leading-[20px]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#656565] text-[16px] leading-[20px]">Taxes</span>
              <span className="text-[#161616] text-[14px] font-medium leading-[20px]">₹{taxes}</span>
            </div>

            <hr className="w-[339px] h-[1px] bg-[#D9D9D9] border-0" />


            <div className="flex justify-between">
              <span className="text-[#161616] text-[20px] leading-[24px]">Total</span>
              <span className="text-[#161616] text-[20px] leading-[24px]">₹{total}</span>
            </div>
          </div>
          <div className="pt-2">
            <button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedSlot}
              className={`w-full px-[20px] py-[12px] text-[16px] font-medium rounded-[8px] transition-all duration-200 ${
                !selectedDate || !selectedSlot
                  ? "bg-[#D7D7D7] text-[#7F7F7F]  cursor-not-allowed"
                  : "bg-[#FFD643] text-[#161616] hover:bg-[#ffca00] cursor-pointer"
              }`}
            >
              Confirm
            </button>
          </div>
          
        </div>
      </section>
    </main>
  );
}
