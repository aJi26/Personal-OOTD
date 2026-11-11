"use client";

let wheelSound: HTMLAudioElement | null = null;
let shutterSound: HTMLAudioElement | null = null;
let hoverSound: HTMLAudioElement | null = null;
let clickSound: HTMLAudioElement | null = null;

if (typeof window !== "undefined") {
  wheelSound = new Audio("/sounds/wheel.mp3");
  shutterSound = new Audio("/sounds/whooshh.mp3");
  hoverSound = new Audio("/sounds/hover.mp3");
  clickSound = new Audio("/sounds/click.mp3");
}

export const playWheelSound = (delta: number) => {
  if (!wheelSound) return;
  const distance = Math.abs(delta);
  
  // 1. Hentikan suara yang sedang berjalan sebelumnya seketika (mencegah efek tumpang tindih/keterusan)
  wheelSound.pause();
  wheelSound.currentTime = 0; 
  
  // Atur volume dan kecepatan sesuai jarak geser
  wheelSound.volume = Math.min(0.2 + (distance * 0.15), 1.0); 
  wheelSound.playbackRate = Math.min(1.0 + (distance * 0.2), 2.0); 
  
  // 2. Putar suara
  wheelSound.play().catch(() => {});

  // 3. PENTING: Potong suara secara paksa agar berhenti dalam waktu singkat (misal: 350 milidetik saja)
  // Ini membuat suara "wheel" hanya berbunyi "tik/klik" cepat saat bergeser, tidak kebablasan mutar panjang.
  setTimeout(() => {
    if (wheelSound) {
      wheelSound.pause();
      wheelSound.currentTime = 0;
    }
  }, 350); 
};

export const playShutterSound = () => {
  if (!shutterSound) return;
  shutterSound.pause();
  shutterSound.currentTime = 0;
  shutterSound.volume = 0.6;
  shutterSound.play().catch(() => {});
};

export const playHoverSound = () => {
  if (!hoverSound) return;
  hoverSound.pause();
  hoverSound.currentTime = 0;
  hoverSound.volume = 0.15;
  hoverSound.play().catch(() => {});
};

export const playClickSound = () => {
  if (!clickSound) return;
  clickSound.pause();
  clickSound.currentTime = 0;
  clickSound.volume = 0.4;
  clickSound.play().catch(() => {});
};