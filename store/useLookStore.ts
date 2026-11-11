import { create } from "zustand";
import { CategoryFilter } from "@/types";

type CursorState = "drag" | "view" | "dot" | "hidden";

interface LookStore {
  // 1. Slider State
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  
  // 2. Archive Filter State
  selectedCategory: CategoryFilter;
  setSelectedCategory: (category: CategoryFilter) => void;
  
  // 3. Autoplay State
  isAutoplay: boolean;
  setIsAutoplay: (isAutoplay: boolean) => void;
  toggleAutoplay: () => void;
  
  // 4. Custom Cursor State
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  isCursorActive: boolean;
  setIsCursorActive: (active: boolean) => void;

  // 5. Cross-page Modal Navigation State
  modalLookId: string | null;
  setModalLookId: (id: string | null) => void;
}

export const useLookStore = create<LookStore>((set) => ({
  // 1. Slider State
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
  
  // 2. Archive Filter State
  selectedCategory: "All Looks",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  // 3. Autoplay State
  isAutoplay: true,
  setIsAutoplay: (isAutoplay) => set({ isAutoplay }),
  toggleAutoplay: () => set((state) => ({ isAutoplay: !state.isAutoplay })),
  
  // 4. Custom Cursor State
  cursorState: "drag",
  setCursorState: (state) => set({ cursorState: state }),
  isCursorActive: false,
  setIsCursorActive: (active) => set({ isCursorActive: active }),

  // 5. Cross-page Modal Navigation State
  modalLookId: null,
  setModalLookId: (id) => set({ modalLookId: id }),
}));