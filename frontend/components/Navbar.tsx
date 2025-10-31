"use client";

import { useState } from "react";
import Image from "next/image";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim().toLowerCase());
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-4 sm:px-10 md:px-16 lg:px-[124px] py-[16px] shadow-md bg-white min-h-[87px]">
      <div className="flex items-center justify-center sm:justify-start">
        <Image
          src="/logo.jpg"
          alt="BookIt logo"
          width={100}
          height={55}
          priority
          className="w-[100px] sm:w-[100px] h-[55px]"
        />
      </div>

      <form
        onSubmit={handleSearch}
        className="flex  sm:w-auto items-center justify-center gap-3"
      >
      <input
        type="text"
        placeholder="Search experiences"
        className="bg-[#ececec] rounded-[4px] px-[16px] py-[12px] text-gray-600 text-sm w-full sm:w-[250px] md:w-[300px] lg:w-[340px] h-[42px] focus:outline-none font-inter placeholder:font-inter placeholder:font-normal placeholder:text-[14px] placeholder:leading-[18px] placeholder:text-[#727272]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />


        <button
          type="submit"
          className="bg-[#ffd643] text-[#161616] font-medium font-Inter text-[14px] rounded-[8px] px-4 sm:px-5 py-2 hover:bg-[#ffca00] transition-all cursor-pointer"
        >
          Search
        </button>
      </form>
    </nav>
  );
}
