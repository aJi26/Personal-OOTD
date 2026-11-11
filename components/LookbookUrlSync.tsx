"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLookStore } from "@/store/useLookStore";
import { looksData } from "@/lib/data/looks";

export function LookbookUrlSync() {
  const searchParams = useSearchParams();
  const { setActiveIndex } = useLookStore();

  useEffect(() => {
    const lookParam = searchParams.get("look");
    if (!lookParam) return;

    // Check if numeric index
    const numeric = parseInt(lookParam, 10);
    if (!isNaN(numeric) && numeric >= 1 && numeric <= looksData.length) {
      setActiveIndex(numeric - 1);
      return;
    }

    // Check if slug
    const foundIdx = looksData.findIndex(
      (l) => l.slug === lookParam || l.id === lookParam
    );
    if (foundIdx !== -1) {
      setActiveIndex(foundIdx);
    }
  }, [searchParams, setActiveIndex]);

  return null;
}
