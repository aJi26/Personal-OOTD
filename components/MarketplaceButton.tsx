"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MarketplaceLink } from "@/types";
import { ShopeeIcon, TokopediaIcon, TikTokShopIcon } from "./icons/MarketplaceIcons";
import { formatIDR, cn } from "@/lib/utils";

interface MarketplaceButtonProps {
  link: MarketplaceLink;
  variant?: "badge" | "primary" | "compact";
  className?: string;
}

export function MarketplaceButton({
  link,
  variant = "badge",
  className,
}: MarketplaceButtonProps) {
  const getPlatformDetails = () => {
    switch (link.platform) {
      case "shopee":
        return {
          icon: <ShopeeIcon className="w-3.5 h-3.5 shrink-0" />,
          label: "Shopee",
          bgHover: "hover:bg-[#EE4D2D] hover:border-[#EE4D2D] hover:text-white",
          activeColor: "text-[#EE4D2D]",
          badgeBg: "bg-[#EE4D2D]/10 text-[#EE4D2D] border-[#EE4D2D]/20",
        };
      case "tokopedia":
        return {
          icon: <TokopediaIcon className="w-3.5 h-3.5 shrink-0" />,
          label: "Tokopedia",
          bgHover: "hover:bg-[#03AC0E] hover:border-[#03AC0E] hover:text-white",
          activeColor: "text-[#03AC0E]",
          badgeBg: "bg-[#03AC0E]/10 text-[#03AC0E] border-[#03AC0E]/20",
        };
      case "tiktok":
        return {
          icon: <TikTokShopIcon className="w-3.5 h-3.5 shrink-0" />,
          label: "TikTok Shop",
          bgHover: "hover:bg-black hover:border-black hover:text-white",
          activeColor: "text-zinc-900",
          badgeBg: "bg-zinc-100 text-zinc-900 border-zinc-200",
        };
      default:
        return {
          icon: null,
          label: link.name,
          bgHover: "hover:bg-zinc-900 hover:text-white",
          activeColor: "text-zinc-900",
          badgeBg: "bg-zinc-100 text-zinc-800 border-zinc-200",
        };
    }
  };

  const details = getPlatformDetails();

  if (variant === "primary") {
    return (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex items-center justify-between w-full px-4 py-3 text-sm font-medium",
          "text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-900",
          "rounded-lg transition-all duration-200 shadow-sm active:scale-[0.99]",
          className
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded bg-zinc-900 group-hover:bg-zinc-800 border border-zinc-800">
            {details.icon}
          </span>
          <div className="text-left">
            <span className="block text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Buy On
            </span>
            <span className="font-semibold text-white">{details.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {link.price && (
            <span className="text-xs font-mono text-zinc-300">
              {formatIDR(link.price)}
            </span>
          )}
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </motion.a>
    );
  }

  if (variant === "compact") {
    return (
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full",
          "border transition-all duration-200",
          details.badgeBg,
          details.bgHover,
          className
        )}
        title={`Open in ${details.label}`}
      >
        {details.icon}
        <span>{details.label}</span>
        <ArrowUpRight className="w-3 h-3 opacity-70" />
      </motion.a>
    );
  }

  return (
    <motion.a
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex items-center justify-between px-3 py-2 rounded-md border border-zinc-200 bg-white",
        "text-xs font-medium text-zinc-800 hover:border-zinc-400 hover:shadow-xs",
        "transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className={details.activeColor}>{details.icon}</span>
        <span>{details.label}</span>
      </div>
      <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-zinc-900">
        {link.price && (
          <span className="font-mono text-[11px] text-zinc-500">
            {formatIDR(link.price)}
          </span>
        )}
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </motion.a>
  );
}
