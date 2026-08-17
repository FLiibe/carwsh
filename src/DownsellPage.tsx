// Route: /downsell
// This page sells the exact same Scale Blueprint at the final US$9.90 price.
// Paste the native Hotmart downsell code only inside the marked container.

import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  Check,
  Clock3,
  LockKeyhole,
  ShieldCheck,
  TrendingDown,
  Users,
  X,
  Zap,
} from "lucide-react";

const DOWNSELL_PRICE_USD = 9.9;

function usePersistentCountdown(storageKey: string, durationSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    const now = Date.now();
    const savedEnd = Number(sessionStorage.getItem(storageKey));
    const end = savedEnd > now ? savedEnd : now + durationSeconds * 1000;
    if (!savedEnd || savedEnd <= now) sessionStorage.setItem(storageKey, String(end));

    const update = () => setSecondsLeft(Math.max(0, Math.ceil((end - Date.now()) / 1000)));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [durationSeconds, storageKey]);

  return `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;
}

const SCALE_BLUEPRINT_WEBP = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786990196/ChatGPT_Image_17_ago_2026_15_07_10_kks9la.webp";
const SCALE_BLUEPRINT_AVIF = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786990196/ChatGPT_Image_17_ago_2026_15_07_10_yiee0u.avif";

function CompactProductVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] py-4 sm:py-6">
      <div className="absolute inset-x-8 bottom-4 h-16 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="relative mx-auto max-w-[280px] sm:max-w-[320px]">
        <picture className="relative block">
          <source srcSet={SCALE_BLUEPRINT_AVIF} type="image/avif" />
          <source srcSet={SCALE_BLUEPRINT_WEBP} type="image/webp" />
          <img
            src={SCALE_BLUEPRINT_WEBP}
            alt="Mobile Car Wash Scale Blueprint"
            className="relative mx-auto w-full rounded-2xl border border-sky-300/30 object-contain shadow-[0_25px_60px_rgba(0,0,0,0.65)]"
            loading="eager"
            referrerPolicy="no-referrer"
            decoding="async"
          />
        </picture>
        <span className="absolute -top-3 right-0 rotate-3 rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-black uppercase tracking-normal text-white shadow-xl sm:-right-3 sm:top-6 sm:rotate-6 sm:px-4 sm:py-2.5 sm:text-xs sm:tracking-wider">
          Final Price • US$9.90
        </span>
      </div>
    </div>
  );
}

function HotmartSalesFunnel() {
  useEffect(() => {
    const scriptId = "hotmart-checkout-elements-script";
    const initWidget = () => {
      const globalAny = window as unknown as { checkoutElements?: { init: (mode: string) => { mount: (selector: string) => void } } };
      if (globalAny.checkoutElements) {
        try {
          globalAny.checkoutElements.init("salesFunnel").mount("#hotmart-sales-funnel");
        } catch (e) {
          console.error("Hotmart sales funnel mount error:", e);
        }
      }
    };

    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
      script.async = true;
      script.onload = () => {
        initWidget();
      };
      document.body.appendChild(script);
    } else {
      initWidget();
    }
  }, []);

  return (
    <div className="w-full">
      {/* HOTMART - Sales Funnel Widget */}
      {/* sales funnel container */}
      <div id="hotmart-sales-funnel" className="min-h-[50px] w-full" />
    </div>
  );
}

export default function DownsellPage() {
  const timer = usePersistentCountdown("mcw-scale-downsell-deadline", 7 * 60);
  const [zarRate, setZarRate] = useState(18.25);

  useEffect(() => {
    let active = true;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        if (active && typeof data?.rates?.ZAR === "number") setZarRate(data.rates.ZAR);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const zarPrice = Math.round(DOWNSELL_PRICE_USD * zarRate);

  return (
    <main className="min-h-screen bg-slate-950 font-sans text-white">
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 border-b border-red-300/20 bg-red-600 px-3 py-2 text-center text-xs font-black uppercase tracking-wide sm:px-4 sm:py-2.5 sm:text-sm">
        <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-300" />
        <span>Final decision required</span>
        <span className="rounded-md bg-slate-950 px-2 py-0.5 font-mono text-sm text-yellow-300 sm:px-2.5 sm:py-1 sm:text-base">{timer}</span>
      </div>

      <section className="relative overflow-hidden px-4 py-10 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#164e63_0%,#071b2d_38%,#020617_80%)]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-red-300/30 bg-red-500/10 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-red-300 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[.18em]">
            <TrendingDown className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> One final private adjustment
          </div>
          <h1 className="mx-auto mt-4 max-w-5xl text-3xl font-black uppercase leading-tight tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl">
            Wait. Before you leave,
            <span className="mt-1 block text-yellow-300 sm:mt-2">take the exact same blueprint for US$5 less.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-200 sm:mt-6 sm:text-lg sm:leading-8">
            Nothing has been removed. You still receive the complete Mobile Car Wash Scale Blueprint, the 30-day installation plan, the 90-day roadmap and every operational scorecard.
          </p>
          <CompactProductVisual />
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-slate-950 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Same product. Final price.</p>
            <h2 className="mt-3 text-2xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">You are not losing a single page.</h2>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-2">
            {[
              "Scale-readiness audit and growth-stage map",
              "Capacity, contribution and job-time calculations",
              "First-helper role, screening and paid-trial scorecard",
              "Five-day onboarding and training matrix",
              "Quality-control and complaint-recovery system",
              "Route-density and daily-dispatch framework",
              "Equipment and second-vehicle investment gates",
              "30-day installation plan and 90-day roadmap",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs font-bold text-slate-800 sm:gap-3 sm:p-4 sm:text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center sm:p-6">
              <Users className="mx-auto h-7 w-7 text-blue-700 sm:h-8 sm:w-8" />
              <h3 className="mt-3 text-base font-black uppercase sm:mt-4 sm:text-lg">Train a helper</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-6">Stop teaching everything from memory during paid jobs.</p>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center sm:p-6">
              <ShieldCheck className="mx-auto h-7 w-7 text-blue-700 sm:h-8 sm:w-8" />
              <h3 className="mt-3 text-base font-black uppercase sm:mt-4 sm:text-lg">Protect quality</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-6">Install visible standards before volume creates rework.</p>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center sm:p-6">
              <Zap className="mx-auto h-7 w-7 text-blue-700 sm:h-8 sm:w-8" />
              <h3 className="mt-3 text-base font-black uppercase sm:mt-4 sm:text-lg">Increase capacity</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-6">Know which change removes the real constraint.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#071b2d] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border-2 border-yellow-300/50 bg-slate-950/80 p-5 text-center shadow-2xl sm:p-10">
          <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-yellow-300 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-950 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs">
            <Clock3 className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Last chance in this purchase flow
          </div>
          <h2 className="mt-5 text-2xl font-black uppercase leading-tight sm:mt-6 sm:text-4xl lg:text-5xl">The complete Scale Blueprint. Final reduced price.</h2>

          <div className="mt-6 grid items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 p-4 sm:mt-8 sm:grid-cols-3 sm:gap-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 sm:block sm:border-0 sm:pb-0">
              <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 sm:text-xs">Original value</p>
              <p className="text-lg font-black text-slate-500 line-through sm:mt-1 sm:text-2xl">US$39.00</p>
            </div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 sm:block sm:border-0 sm:pb-0">
              <p className="text-[11px] font-black uppercase tracking-wider text-red-300 sm:text-xs">Previous page</p>
              <p className="text-lg font-black text-slate-400 line-through sm:mt-1 sm:text-2xl">US$14.90</p>
            </div>
            <div className="rounded-xl bg-yellow-300 p-3.5 text-slate-950 sm:p-4">
              <p className="text-[11px] font-black uppercase tracking-wider sm:text-xs">Final price</p>
              <p className="mt-0.5 text-3xl font-black tracking-tight sm:mt-1 sm:text-4xl">US$9.90</p>
            </div>
          </div>
          <p className="mt-3 text-xs font-bold text-sky-300 sm:mt-4 sm:text-sm">Approximately R{zarPrice} ZAR • One-time payment</p>

          <div className="mt-6 sm:mt-8">
            <HotmartSalesFunnel />
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400 sm:mt-6 sm:text-slate-500">
            <LockKeyhole className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Secure addition handled by Hotmart
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-slate-950 sm:py-14">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center sm:p-10">
          <h2 className="text-xl font-black uppercase sm:text-3xl md:text-4xl">This is the final decision.</h2>
          <div className="mx-auto mt-6 grid max-w-3xl gap-4 text-left sm:mt-7 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
              <p className="text-sm font-black uppercase text-emerald-800 sm:text-base">Add it now</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm sm:leading-6">Get the full operating system and build growth through measured stages instead of improvisation.</p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 sm:p-5">
              <p className="flex items-center gap-2 text-sm font-black uppercase text-rose-800 sm:text-base"><X className="h-4 w-4 sm:h-5 sm:w-5" /> Leave it behind</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-700 sm:text-sm sm:leading-6">Keep only your original order and solve capacity, training and expansion decisions on your own.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-8 text-center text-xs leading-6 text-slate-500">
        © {new Date().getFullYear()} Mobile Car Wash Cash Kit. Educational business material. No customer, revenue or profit result is guaranteed.
      </footer>
    </main>
  );
}
