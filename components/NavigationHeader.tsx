"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLookStore } from "@/store/useLookStore";
import { looksData } from "@/lib/data/looks";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { playHoverSound, playClickSound } from "@/lib/sounds";

export function NavigationHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeIndex, setActiveIndex } = useLookStore();
  const currentLook = looksData[activeIndex] || looksData[0];

  const navLinks = [
    { label: "Lookbook", href: "/" },
    { label: "About", href: "/about" },
    { label: "Archive", href: "/archive" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-zinc-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="flex items-center gap-2 group tracking-tight"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-950 group-hover:scale-125 transition-transform" />
              <span className="font-mono text-base font-bold text-zinc-950 tracking-tighter">
                outfit<span className="text-zinc-400">.</span>archive
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-zinc-100 text-zinc-600 rounded-full border border-zinc-200">
                OOTD
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <motion.div
                key={link.href}
                whileHover={{ y: -2, opacity: 0.7 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className={cn(
                    "relative text-xs uppercase font-mono tracking-widest transition-colors py-1",
                    isActive
                      ? "text-zinc-950 font-bold"
                      : "text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-950 rounded-full" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Right Action: Counter & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Quick Look counter badge */}
          {pathname === "/" && (
            <div className="hidden sm:flex items-center gap-1.5 pl-2">
              <span className="text-[11px] font-mono text-zinc-400">LOOK</span>
              <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                {currentLook.indexFormatted}/{looksData.length.toString().padStart(2, "0")}
              </span>
            </div>
          )}

          {/* Mobile menu trigger */}
          <motion.button
            type="button"
            onMouseEnter={playHoverSound}
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 border border-zinc-200 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-md px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  whileHover={{ y: -2, opacity: 0.7 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    onMouseEnter={playHoverSound}
                    onClick={() => {
                      playClickSound();
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between text-sm uppercase font-mono tracking-wider py-2 px-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-zinc-100 text-zinc-950 font-bold"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Look Selector inside mobile menu */}
          <div className="pt-4 border-t border-zinc-100">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
              Jump To Look
            </span>
            <div className="grid grid-cols-3 gap-2">
              {looksData.map((look, i) => (
                <motion.button
                  key={look.id}
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    setActiveIndex(i);
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-2 py-1.5 text-xs font-mono rounded border text-center transition-all",
                    activeIndex === i
                      ? "bg-zinc-950 text-white border-zinc-950 font-bold"
                      : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                  )}
                >
                  {look.indexFormatted} {look.title.split(" ")[0]}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}