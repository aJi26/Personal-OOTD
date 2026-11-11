"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { useLookStore } from "@/store/useLookStore";
import { looksData } from "@/lib/data/looks";
import { playHoverSound, playClickSound } from "@/lib/sounds";

export function ProductSidebar() {
  const router = useRouter();
  const { activeIndex } = useLookStore();

  const currentLook = looksData[activeIndex] || looksData[0];

  const handleOpenArchiveDetail = () => {
    // Navigasi ke Halaman Archive Catalog
    router.push("/archive");
  };

  return (
    <aside className="w-full h-full flex flex-col justify-between overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLook.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1 flex flex-col overflow-y-auto no-scrollbar p-6 md:p-8"
        >
          {/* Header Sidebar */}
          <div className="border-b border-zinc-100 pb-5 mb-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest">
                LOOK {currentLook.indexFormatted} / {looksData.length.toString().padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/60">
                {currentLook.category}
              </span>
            </div>

            <h2 className="text-2xl font-black text-zinc-950 tracking-tight mt-2">
              {currentLook.title}
            </h2>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed mt-1">
              {currentLook.subtitle}
            </p>
          </div>

          {/* Vibe & Style Note */}
          <div className="bg-zinc-50/80 rounded-xl p-3.5 border border-zinc-200/70 mb-6">
            <div className="flex items-center gap-1.5 text-zinc-800 font-mono text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
              <span>Style Notes</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {currentLook.description}
            </p>
          </div>

          {/* Item Breakdown List */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 uppercase font-bold tracking-wider mb-2">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>In this look</span>
              </div>
              <span>{currentLook.items.length} PIECES</span>
            </div>

            {currentLook.items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="group p-3.5 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-400 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[9px] uppercase font-bold text-zinc-400 tracking-wider block">
                      {item.category} • {item.brand}
                    </span>
                    <h4 className="font-bold text-xs text-zinc-950 mt-0.5 group-hover:text-zinc-800">
                      {item.name}
                    </h4>
                  </div>
                  {item.wornSize && (
                    <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 shrink-0">
                      Size {item.wornSize}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
                  <span className="font-mono text-zinc-400">Color:</span>
                  <span className="font-medium text-zinc-700">{item.color}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action Footer -> Langsung terhubung ke Archive Catalog */}
      <div className="p-6 md:p-8 border-t border-zinc-100 bg-white shrink-0">
        <button
          type="button"
          onClick={handleOpenArchiveDetail}
          className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-zinc-950 text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors shadow-sm group cursor-pointer"
        >
          <span>Explore Full Archive Catalog</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </aside>
  );
}