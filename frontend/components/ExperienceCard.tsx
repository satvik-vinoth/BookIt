"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Experience {
  _id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
}

export default function ExperienceCard({
  _id,
  title,
  location,
  price,
  imageUrl,
}: Experience) {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-gray-100 rounded-[12px] overflow-hidden shadow hover:shadow-lg transition-all w-[280px]">
      <Image
        src={imageUrl}
        alt={title}
        width={280}
        height={170}
        className="object-cover w-full h-[170px]"
        priority
      />
      <div className="px-[16px] py-[12px] flex flex-col justify-between h-[142px] ">
        <div>
          <div className="flex justify-between items-center w-[248px] h-[24px]">
          <h3 className="font-inter font-medium text-[16px] leading-[20px] text-[#161616]">
            {title}
          </h3>

          <span className="bg-[#D6D6D6] text-[#161616] font-inter font-medium text-[11px] leading-[16px] px-[8px] py-[4px] rounded-[4px]">
            {location}
          </span>
          </div>
          <p className="font-inter font-normal text-[12px] leading-[16px] text-[#6C6C6C] mt-2">
            Curated small-group experience. Certified guide. Safety first with gear included.
          </p>

        </div>

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-1 text-black">
            <span className="font-inter text-[12px] leading-[16px] text-[#161616]">From</span>
            <span className="text-lg font-semibold">₹{price}</span>
          </div>
          <button
            onClick={() => router.push(`/experience/${_id}`)}
            className="bg-[#FFD643] text-[#161616] text-[14px] font-medium font-inter px-[8px] py-[6px] rounded hover:bg-yellow-500 transition cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
