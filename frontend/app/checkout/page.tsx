"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState , Suspense} from "react";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";

interface Experience {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();

  const expId = params.get("expId");
  const selectedDate = params.get("date");
  const selectedTime = params.get("time");
  const qty = Number(params.get("qty")) || 1;

  const [experience, setExperience] = useState<Experience | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");


  const TAX_RATE = 0.06;

  useEffect(() => {
    async function fetchExperience() {
      try {
        if (!expId) return;
        const res = await api.get(`/experiences/${expId}`);
        setExperience(res.data);
      } catch (err) {
        console.error("Failed to load experience:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExperience();
  }, [expId]);

  const handleApplyPromo = async () => {
    if (!experience) return;

    setError("");
    setDiscount(0);

    try {
        const res = await api.post("/promo/validate", {
            code: promoCode,
            subtotal: experience.price * qty,
        });
          
      if (res.data.valid) {
        setDiscount(res.data.discount);
        
        setError("");
      } else {
        setError("Invalid promo code");
      }
    } catch {
      setError("Invalid promo code");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Loading checkout...
      </div>
    );

  if (!experience)
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Experience not found.
      </div>
    );

  const subtotal = experience.price * qty;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + taxes - discount;

  const handlePayment = async () => {
    if (!experience) return;

    setNameError("");
    setEmailError("");

    if (!name.trim()) {
      setNameError("Full name is required.");
      return;
    }

    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address.");
      return;
    }
  
    if (!agreed) {
      alert("Please agree to the terms and safety policy before continuing.");
      return;
    }
  
    try {
      const res = await api.post("/bookings", {
        userName: name.trim(),
        email: email.trim(),
        experienceId: experience._id,
        date: selectedDate,
        time: selectedTime,
        quantity: qty,
        promoCode,
        subtotal,
        taxes,
        total,
      });
  
      if (res.data.success) {
        router.push(`/result?ref=${res.data.booking.bookingRef}`);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Booking Error:", error.message);
        alert(error.message);
      } else {
        alert("Unexpected error. Please try again.");
      }
    }
  };
  
  

  return (
    <main className="min-h-screen bg-[#f8f8f8] pb-10">
      <Navbar onSearch={() => {}} />

      <div className="flex items-center gap-2 sm:px-[150px] mt-6 text-sm text-gray-700">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-700 hover:text-black transition cursor-pointer font-bold"
        >
          <span>←</span> Checkout
        </button>
      </div>

      <section className="flex flex-col lg:flex-row gap-8 px-6 sm:px-[150px] mt-8 w-full  mx-auto items-start">
        <div className="flex flex-col bg-[#efefef] px-[24px] py-[20px] flex-1 w-full lg:max-w-[739px]">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex flex-col flex-1">
                <label className="text-[#5B5B5B] text-[14px] mb-[8px]">Full name</label>
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim()) setNameError(""); 
                    }}
                    className={`bg-[#dddddd] text-gray-700 rounded-[6px] px-[16px] py-[12px] outline-none text-sm w-full placeholder:text-[#727272] text-[14px] ${
                    nameError ? "border border-red-500" : ""
                    }`}
                />
                {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
                </div>

                <div className="flex flex-col flex-1">
                <label className="text-[#5B5B5B] text-[14px] mb-[8px]">Email</label>
                <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value.includes("@") && e.target.value.includes("."))
                        setEmailError("");
                    }}
                    className={`bg-[#dddddd] text-gray-700 rounded-[6px] px-[16px] py-[12px] outline-none text-sm w-full  placeholder:text-[#727272] text-[14px] ${
                    emailError ? "border border-red-500" : ""
                    }`}
                />
                {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                </div>

          </div>

          <div className="flex gap-[16px] mb-[16px]">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="flex-1 bg-[#dddddd] text-gray-700 rounded-lg rounded-[6px] px-[16px] py-[12px] outline-none text-sm w-full placeholder:text-[#727272] text-[14px]"
            />
            <button
              onClick={handleApplyPromo}
              className="bg-[#161616] text-[#F9F9F9] rounded-[8px] px-[16px] py-[12px] text-[14px] hover:bg-black"
            >
              Apply
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {discount > 0 && (
            <p className="text-green-600 text-sm mb-2">
              Promo applied! ₹{discount} off
            </p>
          )}

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 accent-black cursor-pointer"
            />
            <span className="text-[#5B5B5B] text-[12px] sm:text-sm text-gray-600">
              I agree to the terms and safety policy
            </span>
          </div>
        </div>

        <div className="flex flex-col bg-[#efefef] rounded-xl p-6 flex-1 max-w-[387px] w-full self-start">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[10px]">
                <div className="flex justify-between">
                <span className="text-[#656565] text-[16px] ">Experience</span>
                <span className="text-[#161616] text-[16px]">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-[#656565] text-[16px] ">Date</span>
                <span className="text-[#161616] text-[16px]">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-[#656565] text-[16px] ">Time</span>
                <span className="text-[#161616] text-[16px]">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-[#656565] text-[16px] ">Qty</span>
                <span className="text-[#161616] text-[16px]">{qty}</span>
                </div>
            </div>

            <div className="flex justify-between">
              <span className="text-[#656565] text-[16px]">Subtotal</span>
              <span className="text-[#161616] text-[16px]">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#656565] text-[16px]">Taxes</span>
              <span className="text-[#161616] text-[16px]">₹{taxes}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>
            )}
          

          <hr className="w-[339px] h-[1px] bg-[#D9D9D9] border-0 " />

          <div className="flex justify-between items-center text-lg font-medium text-black">
            <span className="text-[#161616] text-[20px]">Total</span>
            <span className="text-[#161616] text-[20px]">₹{total}</span>
          </div>
          </div>

          <button
            onClick={handlePayment}
            className={`mt-6 py-3 rounded-[8px] font-medium transition-all duration-200 ${
              !agreed
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#ffd643] text-[#161616] text-[16px] hover:bg-[#ffca00] cursor-pointer"
            }`}
            disabled={!agreed}
          >
            Pay and Confirm
          </button>
        </div>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}