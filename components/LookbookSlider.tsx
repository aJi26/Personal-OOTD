"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
  animate,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";
import { useLookStore } from "@/store/useLookStore";
import { looksData } from "@/lib/data/looks";
import { CustomCursor } from "./CustomCursor";
import { cn } from "@/lib/utils";
import { playWheelSound, playShutterSound } from "@/lib/sounds";

const AUTOPLAY_DURATION_MS = 3500;
const SLIDE_WIDTH = 260;

function normalizeIndex(index: number) {
  return ((index % looksData.length) + looksData.length) % looksData.length;
}

function getCylinder3DTransform(offset: number) {
  const angleRad = offset * (42 * (Math.PI / 180));
  
  const sin = Math.sin(angleRad);
  const cos = Math.cos(angleRad);
  
  const xPercent = sin * 45;
  const depthFactor = (cos + 1) / 2;
  
  const scale = 0.36 + Math.pow(depthFactor, 1.4) * 0.64;
  const opacity = 0.12 + Math.pow(depthFactor, 1.8) * 0.88;
  const blur = (1 - depthFactor) * 9.5;
  const zIndex = Math.round(10 + depthFactor * 40);

  return {
    xPercent,
    scale,
    opacity,
    blur,
    zIndex,
  };
}

export function LookbookSlider() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragControls = useDragControls();

  const {
    activeIndex,
    setActiveIndex,
    setCursorState,
    isAutoplay,
    toggleAutoplay,
    setIsAutoplay,
  } = useLookStore();

  const [virtualActiveIndex, setVirtualActiveIndex] = useState(
    looksData.length * 10 + activeIndex
  );

  const dragX = useMotionValue(0);

  useEffect(() => {
    const currentIndex = normalizeIndex(virtualActiveIndex);
    const forwardDistance = normalizeIndex(activeIndex - currentIndex);
    const delta =
      forwardDistance > looksData.length / 2
        ? forwardDistance - looksData.length
        : forwardDistance;

    if (delta === 0) return;

    setVirtualActiveIndex((current) => current + delta);
    dragX.set(dragX.get() + delta * SLIDE_WIDTH);
    animate(dragX, 0, { duration: 0.55, ease: [0.16, 1, 0.3, 1] });
  }, [activeIndex, dragX, virtualActiveIndex]);

  const moveSlides = useCallback(
    (delta: number) => {
      if (delta === 0) return;
      const nextVirtualIndex = virtualActiveIndex + delta;
      setVirtualActiveIndex(nextVirtualIndex);
      setActiveIndex(normalizeIndex(nextVirtualIndex));
      
      playWheelSound(delta);
      
      dragX.set(dragX.get() + delta * SLIDE_WIDTH);
      animate(dragX, 0, {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      });
    },
    [dragX, setActiveIndex, virtualActiveIndex]
  );

  useEffect(() => {
    if (!isAutoplay) return;
    const intervalId = window.setInterval(() => moveSlides(1), AUTOPLAY_DURATION_MS);
    return () => window.clearInterval(intervalId);
  }, [isAutoplay, moveSlides]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        if (isAutoplay) setIsAutoplay(false);
        moveSlides(-1);
      } else if (event.key === "ArrowRight") {
        if (isAutoplay) setIsAutoplay(false);
        moveSlides(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAutoplay, moveSlides, setIsAutoplay]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipePower = info.offset.x + info.velocity.x * 0.25;
    let delta = Math.round(-swipePower / SLIDE_WIDTH);

    if (delta === 0 && swipePower < -60) delta = 1;
    else if (delta === 0 && swipePower > 60) delta = -1;

    if (delta !== 0) moveSlides(delta);
    else {
      animate(dragX, 0, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
    }

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const visibleIndices = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full flex-col justify-between select-none overflow-hidden bg-[#F4F4F5]"
      onMouseEnter={() => setCursorState("drag")}
      onPointerDown={(event) => {
        isDraggingRef.current = false;
        const target = event.target;
        if (
          target instanceof Element &&
          (target.closest("button, a, [data-no-drag]") ||
            target.closest("[data-ui-element]"))
        ) {
          return;
        }
        dragControls.start(event.nativeEvent);
      }}
    >
      <CustomCursor containerRef={containerRef} />

      <div
        data-ui-element="true"
        className="pointer-events-auto z-40 cursor-default px-8 pt-8 sm:px-10 sm:pt-10 md:px-14 md:pt-12 shrink-0"
        onMouseEnter={() => setCursorState("hidden")}
        onMouseLeave={() => setCursorState("drag")}
      >
        <h1 className="font-sans text-3xl font-black leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl md:text-5xl">
          Try the Look.
        </h1>
        <p className="mt-2 max-w-xs text-xs font-normal leading-relaxed text-zinc-500 sm:mt-3 sm:text-sm">
          Six looks, styled head to toe. Swipe or drag to explore, then click the active look to shop it.
        </p>
      </div>

      <div
        ref={stageRef}
        className="relative flex-1 w-full max-w-[1100px] mx-auto flex items-center justify-center overflow-hidden touch-none my-2 sm:my-0"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 h-full w-full"
          drag="x"
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ left: -SLIDE_WIDTH * 3, right: SLIDE_WIDTH * 3 }}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 24 }}
          dragMomentum={false}
          style={{ x: dragX, touchAction: "none" }}
          onDragStart={() => {
            isDraggingRef.current = true;
            if (isAutoplay) setIsAutoplay(false);
          }}
          onDragEnd={handleDragEnd}
        />

        {visibleIndices.map((offset) => {
          const virtualIndex = virtualActiveIndex + offset;
          const look = looksData[normalizeIndex(virtualIndex)];
          const isActive = offset === 0;

          return (
            <Individual3DSlide
              key={virtualIndex}
              look={look}
              offset={offset}
              dragX={dragX}
              isActive={isActive}
              isDraggingRef={isDraggingRef}
              onSelectSlide={(targetOffset) => {
                if (isAutoplay) setIsAutoplay(false);
                moveSlides(targetOffset);
              }}
              onNavigateArchive={() => router.push("/archive")}
              setCursorState={setCursorState}
            />
          );
        })}
      </div>

      <div
        data-ui-element="true"
        className="pointer-events-auto z-40 flex items-center justify-between px-8 pb-6 sm:px-10 sm:pb-8 md:px-14 md:pb-10 shrink-0"
        onMouseEnter={() => setCursorState("hidden")}
        onMouseLeave={() => setCursorState("drag")}
      >
        <div className="no-scrollbar flex items-center gap-3 overflow-x-auto sm:gap-4">
          <motion.button
            type="button"
            className="cursor-pointer p-1 text-zinc-700 transition-colors hover:text-zinc-950"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isAutoplay) setIsAutoplay(false);
              moveSlides(-1);
            }}
          >
            <ArrowLeft className="h-4 w-4 stroke-[2]" />
          </motion.button>

          <div className="flex items-center gap-2 sm:gap-3">
            {looksData.map((look, index) => {
              const isCurrent = activeIndex === index;
              return (
                <motion.button
                  key={look.id}
                  type="button"
                  className="group flex cursor-pointer flex-col items-start gap-1 py-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (isAutoplay) setIsAutoplay(false);
                    const forwardDistance = normalizeIndex(index - activeIndex);
                    const diff =
                      forwardDistance > looksData.length / 2
                        ? forwardDistance - looksData.length
                        : forwardDistance;
                    moveSlides(diff);
                  }}
                >
                  <div
                    className={cn(
                      "relative h-[2px] overflow-hidden transition-all duration-300",
                      isCurrent ? "w-24 bg-zinc-300 sm:w-36" : "w-6 bg-zinc-300 group-hover:bg-zinc-400 sm:w-10"
                    )}
                  >
                    {isCurrent && (
                      <motion.div
                        key={`${activeIndex}-${isAutoplay ? "playing" : "paused"}`}
                        className="absolute inset-y-0 left-0 bg-zinc-950"
                        initial={{ width: isAutoplay ? "0%" : "100%" }}
                        animate={{ width: "100%" }}
                        transition={isAutoplay ? { duration: AUTOPLAY_DURATION_MS / 1000, ease: "linear" } : { duration: 0 }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className={cn("transition-colors", isCurrent ? "font-bold text-zinc-950" : "text-zinc-400 group-hover:text-zinc-600")}>
                      {look.indexFormatted}
                    </span>
                    {isCurrent && (
                      <span className="hidden whitespace-nowrap font-sans text-xs font-medium text-zinc-800 sm:inline">
                        {look.title}
                      </span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="ml-3 flex shrink-0 items-center gap-3">
          <motion.button
            type="button"
            className="cursor-pointer rounded-full p-1.5 text-zinc-700 transition-colors hover:bg-zinc-200/60 hover:text-zinc-950"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAutoplay}
          >
            {isAutoplay ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />}
          </motion.button>

          <motion.button
            type="button"
            className="cursor-pointer p-1 text-zinc-700 transition-colors hover:text-zinc-950"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isAutoplay) setIsAutoplay(false);
              moveSlides(1);
            }}
          >
            <ArrowRight className="h-4 w-4 stroke-[2]" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function Individual3DSlide({
  look,
  offset,
  dragX,
  isActive,
  isDraggingRef,
  onSelectSlide,
  onNavigateArchive,
  setCursorState,
}: {
  look: (typeof looksData)[0];
  offset: number;
  dragX: MotionValue<number>;
  isActive: boolean;
  isDraggingRef: RefObject<boolean>;
  onSelectSlide: (offset: number) => void;
  onNavigateArchive: () => void;
  setCursorState: (state: "drag" | "view" | "dot" | "hidden") => void;
}) {
  const dynamicTransform = useTransform(dragX, (latestX: number) => {
    const currentContinuousOffset = offset + latestX / SLIDE_WIDTH;
    return getCylinder3DTransform(currentContinuousOffset);
  });

  const x = useTransform(dynamicTransform, (t) => `${t.xPercent}%`);
  const scale = useTransform(dynamicTransform, (t) => t.scale);
  const opacity = useTransform(dynamicTransform, (t) => t.opacity);
  const filter = useTransform(dynamicTransform, (t) => `blur(${t.blur}px)`);
  const zIndex = useTransform(dynamicTransform, (t) => t.zIndex);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex h-full w-full items-end justify-center pb-6 md:pb-8"
      style={{
        x,
        scale,
        opacity,
        filter,
        zIndex,
      }}
    >
      <div
        className="pointer-events-auto relative mx-auto flex h-[85%] sm:h-[90%] max-h-[480px] w-auto max-w-[220px] cursor-none items-end justify-center"
        onClick={() => {
          if (isDraggingRef.current) return;
          if (isActive) {
            playShutterSound();
            // --- TAMBAHAN BARU: Simpan ID ke store sebelum pindah halaman ---
            useLookStore.getState().setModalLookId(look.id);
            onNavigateArchive();
          } else {
            onSelectSlide(offset);
          }
        }}
        onMouseEnter={() => setCursorState(isActive ? "view" : "dot")}
        onMouseLeave={() => setCursorState("drag")}
      >
        <Image
          src={look.modelImage}
          alt={look.title}
          width={look.modelImageWidth || 400}
          height={look.modelImageHeight || 800}
          priority={isActive}
          draggable={false}
          className="pointer-events-none h-full w-auto select-none object-contain object-bottom drop-shadow-md"
        />
        <div className="pointer-events-none absolute -bottom-2 left-1/2 h-3 w-40 -translate-x-1/2 rounded-[50%] bg-black/30 blur-[6px]" />
      </div>
    </motion.div>
  );
}