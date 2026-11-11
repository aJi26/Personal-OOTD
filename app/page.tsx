"use client";

import React, { useState } from "react";
import { LookbookSlider } from "@/components/LookbookSlider";
import { ProductSidebar } from "@/components/ProductSidebar";
import { InitialLoader } from "@/components/InitialLoader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="flex h-[calc(100vh-80px)] flex-col bg-[#F4F4F5] overflow-hidden relative">
      {/* Loading Screen di awal */}
      <InitialLoader onComplete={() => setIsLoaded(true)} />

      <div className="flex flex-col md:flex-row flex-1 w-full h-full overflow-hidden">
        {/* Sisi Kiri / Utama: Lookbook Slider */}
        <div className="flex-[7] md:flex-1 flex flex-col justify-between relative overflow-hidden">
          <LookbookSlider />
        </div>

        {/* Sisi Kanan: Product Sidebar */}
        <div className="flex-[3] md:flex-none w-full md:w-[350px] lg:w-[400px] shrink-0 overflow-y-auto bg-white border-t md:border-t-0 md:border-l border-zinc-200">
          <ProductSidebar />
        </div>
      </div>
    </main>
  );
}