// Route: /upsell
// Paste the native Hotmart upsell code only inside the marked container.

import React, { useEffect, useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Check,
  ChevronDown,
  Clock3,
  Gauge,
  LockKeyhole,
  MapPinned,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";

const UPSELL_PRICE_USD = 14.9;

function usePersistentCountdown(storageKey: string, durationSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);

  useEffect(() => {
    const now = Date.now();
    const savedEnd = Number(sessionStorage.getItem(storageKey));
    const end = savedEnd > now ? savedEnd : now + durationSeconds * 1000;

    if (!savedEnd || savedEnd <= now) {
      sessionStorage.setItem(storageKey, String(end));
    }

    const update = () => {
      setSecondsLeft(Math.max(0, Math.ceil((end - Date.now()) / 1000)));
    };

    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [durationSeconds, storageKey]);

  return `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
    secondsLeft % 60,
  ).padStart(2, "0")}`;
}

const SCALE_BLUEPRINT_WEBP = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786990196/ChatGPT_Image_17_ago_2026_15_07_10_kks9la.webp";
const SCALE_BLUEPRINT_AVIF = "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786990196/ChatGPT_Image_17_ago_2026_15_07_10_yiee0u.avif";

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

function ProductVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] px-2 py-4 sm:py-6">
      <div className="absolute inset-x-8 bottom-2 h-20 rounded-full bg-blue-500/25 blur-3xl" />
      <picture className="relative block">
        <source srcSet={SCALE_BLUEPRINT_AVIF} type="image/avif" />
        <source srcSet={SCALE_BLUEPRINT_WEBP} type="image/webp" />
        <img
          src={SCALE_BLUEPRINT_WEBP}
          alt="Mobile Car Wash Scale Blueprint"
          className="relative mx-auto w-full max-w-[340px] rounded-2xl border border-blue-400/20 object-contain shadow-[0_25px_60px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:scale-[1.02] sm:max-w-[420px]"
          loading="eager"
          referrerPolicy="no-referrer"
          decoding="async"
        />
      </picture>
    </div>
  );
}

function FAQ({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-extrabold text-slate-950 sm:gap-4 sm:py-5 sm:text-base"
      >
        <span className="leading-snug">{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-blue-600" : "text-slate-400"}`} />
      </button>
      {open && <div className="pb-5 text-sm leading-relaxed text-slate-600">{children}</div>}
    </div>
  );
}

export default function UpsellPage() {
  const timer = usePersistentCountdown("mcw-scale-upsell-deadline", 10 * 60);
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

  const zarPrice = Math.round(UPSELL_PRICE_USD * zarRate);

  const modules = [
    [Gauge, "Capacity Math", "Know exactly when another helper, route or vehicle can pay for itself."],
    [Users, "First-Helper System", "Role definition, screening, paid trial, onboarding and skill sign-off."],
    [ShieldCheck, "Quality Control", "Stop rushed work and rework from destroying customer trust."],
    [MapPinned, "Route Density", "Group profitable jobs and remove unpaid travel from the day."],
    [Wrench, "Upgrade Gates", "Buy equipment only when demand and numbers justify the decision."],
    [TrendingUp, "30 & 90-Day Plans", "Install the system now, then grow through controlled milestones."],
  ] as const;

  return (
    <main className="min-h-screen bg-slate-950 font-sans text-white">
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 border-b border-red-400/20 bg-red-600 px-3 py-2 text-center text-xs font-black uppercase tracking-wide shadow-xl sm:px-4 sm:py-2.5 sm:text-sm">
        <Clock3 className="h-4 w-4 shrink-0 animate-pulse text-yellow-300" />
        <span>This private upgrade closes in</span>
        <span className="rounded-md bg-slate-950 px-2 py-0.5 font-mono text-sm text-yellow-300 sm:px-2.5 sm:py-1 sm:text-base">{timer}</span>
      </div>

      <section className="relative overflow-hidden px-4 pb-12 pt-8 sm:pb-16 sm:pt-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0b4a75_0%,#071b2d_36%,#020617_78%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-yellow-300 sm:mb-7 sm:px-4 sm:py-2 sm:text-xs">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> One-time post-purchase upgrade
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <p className="text-xs font-black uppercase tracking-[.18em] text-sky-400 sm:text-sm">
                Wait. You bought the system to start.
              </p>
              <h1 className="mt-3 text-3xl font-black uppercase leading-tight tracking-tight sm:mt-4 sm:text-5xl lg:text-6xl">
                Do not build a business that
                <span className="mt-1 block text-yellow-300 sm:mt-2">only works when you do everything.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-slate-200 sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">
                Add the exact operating blueprint that shows you how to increase capacity, train a helper, protect quality and move from random busy days to a controlled mobile car wash operation.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-bold sm:mt-7 sm:gap-3 sm:text-sm lg:justify-start">
                {["24 practical pages", "30-day installation plan", "90-day growth roadmap"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <ProductVisual />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">The trap nobody warns you about</p>
            <h2 className="mx-auto mt-3 max-w-4xl text-2xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">
              More bookings can make your business worse if every decision still depends on you.
            </h2>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2">
            {[
              "You accept more jobs but have no reliable capacity calculation.",
              "A helper creates more mistakes because the work was never documented.",
              "Quality drops while complaints and free rework increase.",
              "You buy equipment before demand can repay the investment.",
              "Routes stay scattered, turning working hours into unpaid travel.",
              "You become the bottleneck in sales, production and customer service.",
            ].map((problem) => (
              <div key={problem} className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 font-bold text-slate-800 sm:p-5">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 sm:h-5 sm:w-5" />
                <span className="text-xs leading-relaxed sm:text-sm">{problem}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border-2 border-blue-200 bg-blue-50 p-5 text-center sm:mt-10 sm:p-8">
            <p className="text-base font-black text-blue-950 sm:text-xl md:text-2xl">
              The Scale Blueprint gives you the missing bridge between “I can wash cars” and “this business can operate predictably.”
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-4 py-12 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Inside the blueprint</p>
            <h2 className="mt-3 text-2xl font-black uppercase leading-tight sm:text-4xl lg:text-5xl">Control growth before growth controls you.</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modules.map(([Icon, name, description]) => (
              <article key={name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-4 text-base font-black uppercase sm:mt-5 sm:text-lg">{name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm sm:leading-6">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071b2d] px-4 py-12 sm:py-16" id="private-upgrade">
        <div className="mx-auto max-w-3xl rounded-3xl border border-blue-300/25 bg-slate-950/70 p-5 text-center shadow-2xl sm:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-300 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-slate-950 sm:gap-2 sm:px-4 sm:py-2 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Private customer-only price
          </span>
          <h2 className="mt-5 text-2xl font-black uppercase leading-tight sm:mt-6 sm:text-4xl lg:text-5xl">Add the Scale Blueprint now.</h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
            This page is not publicly advertised. Once you leave it, the US$14.90 upgrade price may no longer be available through this purchase flow.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900 p-4 sm:mt-8 sm:p-6">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 sm:text-xs sm:tracking-[.2em]">Normal standalone value</p>
            <p className="mt-1 text-xl font-black text-slate-500 line-through sm:text-2xl">US$39.00</p>
            <p className="mt-3 text-[11px] font-black uppercase tracking-wider text-yellow-300 sm:mt-4 sm:text-xs sm:tracking-[.2em]">Add to this order for</p>
            <p className="mt-1 text-4xl font-black tracking-tight text-white sm:text-6xl">US$14.90</p>
            <p className="mt-2 text-xs font-bold text-sky-300 sm:text-sm">Approximately R{zarPrice} ZAR • One-time payment</p>
          </div>

          <div className="mx-auto mt-6 max-w-xl text-left sm:mt-7">
            {["Immediate digital access", "Complete 24-page Scale Blueprint", "Printable scorecards and checklists", "Covered by the applicable Hotmart refund policy"].map((item) => (
              <div key={item} className="flex items-center gap-2.5 border-b border-slate-800 py-2.5 text-xs font-bold text-slate-200 sm:gap-3 sm:py-3 sm:text-sm">
                <Check className="h-4 w-4 shrink-0 text-emerald-400 sm:h-5 sm:w-5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8">
            <HotmartSalesFunnel />
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400 sm:mt-6 sm:text-slate-500">
            <LockKeyhole className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" /> Secure addition handled by Hotmart
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Before you decide</p>
            <h2 className="mt-3 text-2xl font-black uppercase leading-tight sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mt-6 sm:mt-8">
            <FAQ question="Is this the same as the Cash Kit?">No. The Cash Kit helps you launch, price and sell the service. The Scale Blueprint is the next-stage operating system for capacity, team training, quality control, routes and expansion decisions.</FAQ>
            <FAQ question="Do I need employees already?">No. It shows you what must be measured and documented before adding a helper, including the financial and operational gates that help prevent premature hiring.</FAQ>
            <FAQ question="Is this another generic business ebook?">No. It is a focused mobile car wash operating manual with practical scorecards, role controls, route systems, upgrade gates and a 30- and 90-day implementation path.</FAQ>
            <FAQ question="Is it a physical product?">No. It is a digital PDF available through your Hotmart purchase access.</FAQ>
            <FAQ question="Does it guarantee business growth?">No. It gives you a structured decision and implementation system. Results depend on demand, pricing, execution, service quality and local conditions.</FAQ>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-8 text-center text-xs leading-6 text-slate-500">
        © {new Date().getFullYear()} Mobile Car Wash Cash Kit. Educational business material. No customer, revenue or profit result is guaranteed.
      </footer>
    </main>
  );
}
