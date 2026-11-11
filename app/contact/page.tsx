"use client";

import React, { useState } from "react";
import { playHoverSound, playClickSound } from "@/lib/sounds"; 
import {
  Send,
  Copy,
  Check,
  ArrowUpRight,
  MessageSquare,
  Globe,
  X,
  Construction,
} from "lucide-react";
import {
  TikTokShopIcon,
  InstagramIcon,
} from "@/components/icons/MarketplaceIcons";

export default function ContactPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [showPortfolioAlert, setShowPortfolioAlert] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brand: "",
    message: "",
  });

  const emailAddress = "26b.ajii@gmail.com";

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setFormSent(true);
  };

  const socialChannels = [
    {
      name: "Instagram",
      handle: "@stujii_",
      url: "https://instagram.com/stujii_",
      icon: <InstagramIcon className="w-5 h-5" />,
      subtext: "Daily street snaps & fit stories",
      isModalTrigger: false,
    },
    {
      name: "TikTok",
      handle: "@stuji_",
      url: "https://tiktok.com/@stuji_",
      icon: <TikTokShopIcon className="w-5 h-5" />,
      subtext: "Short-form styling tips & haul reviews",
      isModalTrigger: false,
    },
    {
      name: "Portfolio",
      handle: "Web Portfolio",
      url: "#",
      icon: <Globe className="w-5 h-5" />,
      subtext: "Personal design & creative works",
      isModalTrigger: true,
    },
  ];

  return (
    <div className="flex-1 w-full bg-white overflow-y-auto relative">
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-12 border-b border-zinc-200 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              Get in Touch
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight font-sans">
            Connect & Inquire.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed">
            Open to creative brand partnerships, PR product seedings, editorial styling, and discussions on contemporary streetwear and minimalism.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/60 space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-bold block">
                Primary Inquiry Email
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-zinc-950">
                  {emailAddress}
                </span>
                <button
                  type="button"
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    handleCopy(emailAddress, "email");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                >
                  {copiedField === "email" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Direct inquiries for Aji Bayu Pamungkas. Based in Surabaya, Indonesia (UTC+7).
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block">
                Social Platforms
              </span>
              <div className="space-y-2.5">
                {socialChannels.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    onMouseEnter={playHoverSound}
                    onClick={(e) => {
                      playClickSound();
                      if (channel.isModalTrigger) {
                        e.preventDefault();
                        setShowPortfolioAlert(true);
                      }
                    }}
                    target={channel.url === "#" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-xl border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50/50 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-lg bg-zinc-100 text-zinc-900 group-hover:bg-zinc-950 group-hover:text-white transition-colors">
                        {channel.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-zinc-950">
                            {channel.name}
                          </span>
                          <span className="font-mono text-xs text-zinc-400">
                            {channel.handle}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 block">
                          {channel.subtext}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-zinc-200 bg-white shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-4 h-4 text-zinc-950" />
              <h2 className="font-bold text-lg text-zinc-950">
                Send a Message
              </h2>
            </div>

            {formSent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-950">
                  Message Dispatched
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Thank you for reaching out. Aji will get back to your inquiry promptly.
                </p>
                <button
                  type="button"
                  onMouseEnter={playHoverSound}
                  onClick={() => {
                    playClickSound();
                    setFormSent(false);
                    setFormData({ name: "", email: "", brand: "", message: "" });
                  }}
                  className="mt-4 text-xs font-mono text-zinc-600 underline hover:text-zinc-950 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-950 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-950 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                    Brand / Agency (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Apparel Studio"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-950 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share brief details about your campaign or inquiry..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-zinc-200 bg-white placeholder:text-zinc-400 focus:outline-hidden focus:border-zinc-950 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHoverSound}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-zinc-950 text-white font-mono text-xs font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Unique Popup Alert / Modal untuk Portfolio */}
      {showPortfolioAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-2xl bg-white border border-zinc-200 p-6 shadow-2xl text-center space-y-4">
            <button
              type="button"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                setShowPortfolioAlert(false);
              }}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-950 mx-auto flex items-center justify-center shadow-inner">
              <Construction className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-base text-zinc-950 font-sans">
                Oops, Still Cooking! 🍳
              </h3>
              <p className="text-xs text-zinc-500 font-mono leading-relaxed px-2">
                Porto-nya belum jadi hehe. Sabar ya, hal-hal keren lagi diracik di balik layar!
              </p>
            </div>

            <button
              type="button"
              onMouseEnter={playHoverSound}
              onClick={() => {
                playClickSound();
                setShowPortfolioAlert(false);
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-mono font-bold hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm"
            >
              Siap, Paham!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}