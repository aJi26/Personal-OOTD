"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Layers } from "lucide-react";
import { looksData } from "@/lib/data/looks";
import { CategoryFilter, Look } from "@/types";
import { useLookStore } from "@/store/useLookStore";
import { cn } from "@/lib/utils";
import { MarketplaceButton } from "@/components/MarketplaceButton";
import { playHoverSound, playClickSound, playShutterSound } from "@/lib/sounds";

const categories: CategoryFilter[] = [
  "All Looks",
  "Casual",
  "Streetwear",
  "Minimal",
  "Smart Casual",
];

export default function ArchivePage() {
  const router = useRouter();
  const { 
    setActiveIndex, 
    selectedCategory, 
    setSelectedCategory,
    modalLookId,
    setModalLookId
  } = useLookStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLookModal, setSelectedLookModal] = useState<Look | null>(null);

  // --- EFEK BARU: Buka Modal Otomatis jika ada kiriman ID ---
  useEffect(() => {
    if (modalLookId) {
      const lookToOpen = looksData.find((l) => l.id === modalLookId);
      if (lookToOpen) {
        setSelectedLookModal(lookToOpen);
      }
      setModalLookId(null); // Bersihkan agar tidak terbuka lagi saat di-refresh
    }
  }, [modalLookId, setModalLookId]);

  const filteredLooks = useMemo(() => {
    return looksData.filter((look) => {
      const matchesCategory =
        selectedCategory === "All Looks" || look.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        look.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        look.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        look.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        look.items.some(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenInLookbook = (index: number) => {
    setActiveIndex(index);
    router.push("/");
  };

  return (
    <div className="flex-1 w-full bg-white overflow-y-auto">
      <section className="border-b border-zinc-200 bg-zinc-50/50 py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-zinc-950" />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                  Personal Archive
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tight font-sans">
                Archive Catalog.
              </h1>
              <p className="mt-2 text-sm md:text-base text-zinc-500 max-w-xl">
                Explore every curated outfit silhouette, style breakdown, and piece specifications across all personal looks.
              </p>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-zinc-500 border-t md:border-t-0 md:border-l border-zinc-200 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="block text-xl font-bold text-zinc-950">
                  {looksData.length}
                </span>
                <span>Total Looks</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-zinc-950">
                  {looksData.reduce((acc, look) => acc + look.items.length, 0)}
                </span>
                <span>Pieces Cataloged</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                      playClickSound();
                      setSelectedCategory(cat);
                    }}
                    className={cn(
                      "px-4 py-2 text-xs font-mono rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer",
                      isActive
                        ? "bg-zinc-950 text-white font-semibold shadow-xs"
                        : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-950"
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search outfit, item, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs font-mono rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-950 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    setSearchQuery("");
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {filteredLooks.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-zinc-200 rounded-2xl">
            <p className="font-mono text-sm text-zinc-500">
              No looks match your search &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <button
              type="button"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                setSearchQuery("");
                setSelectedCategory("All Looks");
              }}
              className="mt-4 px-4 py-2 text-xs font-mono bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredLooks.map((look) => {
              const originalIndex = looksData.findIndex((l) => l.id === look.id);

              return (
                <motion.div
                  key={look.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group flex flex-col rounded-xl border border-zinc-200 bg-white overflow-hidden hover:border-zinc-400 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300"
                >
                  {/* Model Visual Stage */}
                  <div
                    className="relative w-full h-64 sm:h-72 md:h-80 bg-[#F4F4F5] flex items-end justify-center p-4 cursor-pointer overflow-hidden"
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                      playShutterSound();
                      setSelectedLookModal(look);
                    }}
                  >
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-white rounded border border-zinc-200 text-zinc-900">
                        {look.indexFormatted}
                      </span>
                      <span className="font-mono text-[10px] uppercase px-2 py-0.5 bg-white/80 rounded border border-zinc-200 text-zinc-600">
                        {look.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-mono font-bold shadow-md">
                        View Breakdown
                      </span>
                    </div>

                    <div className="relative w-full h-[90%] flex items-end justify-center">
                      <Image
                        src={look.modelImage}
                        alt={look.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain object-bottom group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="absolute bottom-2 w-32 h-3 rounded-[100%] bg-zinc-950/20 blur-xs pointer-events-none" />
                  </div>

                  {/* Card Content & Meta */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm md:text-base text-zinc-950 line-clamp-1">
                        {look.title}
                      </h3>
                      <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                        {look.subtitle}
                      </p>

                      <div className="mt-3 flex items-center justify-between text-xs font-mono border-t border-zinc-100 pt-2.5">
                        <span className="text-zinc-500">
                          {look.items.length} items
                        </span>
                        <span className="font-semibold text-zinc-700 uppercase">
                          {look.season}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-2">
                      <button
                        type="button"
                        onMouseEnter={playHoverSound}
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          handleOpenInLookbook(originalIndex);
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-mono font-bold rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <span>Open 3D</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onMouseEnter={playHoverSound}
                        onClick={(e) => {
                          e.stopPropagation();
                          playClickSound();
                          setSelectedLookModal(look);
                        }}
                        className="p-2 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
                        title="View outfit breakdown"
                      >
                        <Layers className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedLookModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedLookModal(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col md:flex-row z-10"
            >
              <button
                type="button"
                onMouseEnter={playHoverSound}
                onClick={() => {
                  playClickSound();
                  setSelectedLookModal(null);
                }}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-zinc-950 shadow-xs border border-zinc-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full md:w-5/12 bg-[#F4F4F5] p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-zinc-200">
                <div className="w-full text-left">
                  <span className="font-mono text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    LOOK {selectedLookModal.indexFormatted} • {selectedLookModal.season}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-zinc-950 mt-1">
                    {selectedLookModal.title}
                  </h3>
                  <span className="inline-block mt-1 font-mono text-xs uppercase px-2 py-0.5 rounded bg-zinc-200 text-zinc-800">
                    {selectedLookModal.category}
                  </span>
                </div>

                <div className="relative w-full h-64 md:h-80 flex items-end justify-center my-4">
                  <Image
                    src={selectedLookModal.modelImage}
                    alt={selectedLookModal.title}
                    fill
                    className="object-contain object-bottom drop-shadow-md"
                  />
                  <div className="absolute bottom-0 w-36 h-3 rounded-[100%] bg-zinc-950/20 blur-xs pointer-events-none" />
                </div>

                <button
                  type="button"
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    const idx = looksData.findIndex((l) => l.id === selectedLookModal.id);
                    handleOpenInLookbook(idx);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-zinc-950 text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <span>Open In 3D Lookbook Canvas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full md:w-7/12 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[85vh]">
                <div className="border-b border-zinc-200 pb-4 mb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-semibold block">
                    Outfit Breakdown ({selectedLookModal.items.length} items)
                  </span>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                    {selectedLookModal.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedLookModal.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-800">
                              {item.category}
                            </span>
                            <span className="text-[11px] font-mono text-zinc-400">
                              {item.brand}
                            </span>
                          </div>
                          <h4 className="font-semibold text-sm text-zinc-950 mt-1">
                            {item.name}
                          </h4>
                          <span className="text-xs text-zinc-500">
                            Size <strong>{item.wornSize}</strong> • Color: {item.color}
                          </span>
                        </div>
                      </div>
                      
                      {item.description && (
                        <p className="text-xs text-zinc-600 leading-relaxed mt-1">
                          {item.description}
                        </p>
                      )}

                      {item.marketplaceLinks && item.marketplaceLinks.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-zinc-200/60 mt-2">
                          {item.marketplaceLinks.map((link) => (
                            <MarketplaceButton
                              key={link.platform}
                              link={link}
                              variant="badge"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}