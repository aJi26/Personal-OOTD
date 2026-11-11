"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitialLoader({ onComplete }: { onComplete?: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cek apakah suara intro sudah pernah diputar pada sesi ini
    const hasPlayedIntro = sessionStorage.getItem("intro_sound_played");

    if (!hasPlayedIntro) {
      // Jika belum pernah, tandai sudah diputar dan nyalakan suara intro
      sessionStorage.setItem("intro_sound_played", "true");
      if (typeof window !== "undefined") {
        const introAudio = new Audio("/sounds/intro.mp3");
        introAudio.volume = 0.4;
        introAudio.play().catch(() => {
          // Ditangkap jika browser memblokir autoplay sebelum user berinteraksi
        });
      }
    }

    // Simulasi progress bar loading (0 hingga 100%)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    // Waktu total loading screen muncul (1.6 detik)
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onComplete) onComplete();
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[#F4F4F5] px-6 py-12 select-none"
        >
          {/* Bagian Atas */}
          <div className="w-full max-w-xl flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-400">
            <span>[ SYSTEM INITIALIZING ]</span>
            <span>SURABAYA, IDN</span>
          </div>

          {/* Bagian Tengah: Brand Typography */}
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 animate-pulse" />
              <span className="font-mono text-2xl sm:text-3xl font-black tracking-tighter text-zinc-950">
                outfit<span className="text-zinc-400">.</span>archive
              </span>
            </motion.div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              Curated Silhouette & Lookbook Experience
            </p>
          </div>

          {/* Bagian Bawah: Progress Bar */}
          <div className="w-full max-w-xs space-y-2">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-600">
              <span>LOADING ASSETS</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="relative h-[2px] w-full bg-zinc-200 overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-y-0 left-0 bg-zinc-950"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}