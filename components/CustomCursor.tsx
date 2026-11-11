"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useLookStore } from "@/store/useLookStore";

interface CustomCursorProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CustomCursor({ containerRef }: CustomCursorProps) {
  const { cursorState, isCursorActive, setCursorState } = useLookStore();
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 26, stiffness: 450, mass: 0.15 };
  const cursorX = useSpring(-200, springConfig);
  const cursorY = useSpring(-200, springConfig);

  // HAPUS useEffect yang memaksa setCursorState("drag") di sini agar status kursor tidak tertimpa

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        setIsVisible(inside);
        if (!inside) return;
      } else {
        setIsVisible(true);
      }

      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, cursorX, cursorY]);

  if (!isVisible && !isCursorActive) return null;

  const shouldShow = isVisible && cursorState !== "hidden";
  
  // Perbarui style kursor "drag" menjadi semi-transparan dengan backdrop blur yang lembut
  const cursorStyle =
    cursorState === "dot"
      ? "h-5 w-5 rounded-full border border-white/20 bg-black"
      : cursorState === "view"
        ? "flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/35 text-black shadow-sm backdrop-blur-[2px]"
        : "flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/40 bg-white/35 text-zinc-950 shadow-xl backdrop-blur-md";

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden select-none md:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: shouldShow ? 1 : 0,
        scale: shouldShow ? 1 : cursorState === "hidden" ? 0 : 0.5,
      }}
      transition={{ duration: 0.15 }}
    >
      <div className={`${cursorStyle} pointer-events-none aspect-square shrink-0`}>
        {cursorState === "dot" ? null : cursorState === "view" ? (
          <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest">
            VIEW
          </span>
        ) : (
          <>
            <div className="mb-0.5 flex items-center gap-1 text-zinc-600">
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span className="h-1 w-1 rounded-full bg-zinc-950" />
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <span className="text-center font-mono text-[10px] font-extrabold uppercase leading-none tracking-widest">
              DRAG
            </span>
          </>
        )}
      </div>
    </motion.div>
  );
}