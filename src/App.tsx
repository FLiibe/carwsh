import React, { useState, useEffect } from "react";
import {
  Wrench,
  Calculator,
  MessageSquare,
  Check,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  Timer,
  Star,
  Lock,
  CheckCircle2,
  Clock
} from "lucide-react";

import siphoImg from "./assets/images/sipho_avatar_1786822577972.jpg";
import dyllanImg from "./assets/images/dyllan_avatar_1786822588428.jpg";
import thaboImg from "./assets/images/thabo_avatar_1786822596741.jpg";
import leratoImg from "./assets/images/lerato_avatar_1786822604641.jpg";
import brianImg from "./assets/images/brian_avatar_1786822615603.jpg";
import UpsellPage from "./UpsellPage.tsx";
import DownsellPage from "./DownsellPage.tsx";
import ThankYouPage from "./ThankYouPage.tsx";

function getRoute() {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (path === "/upsell" || path.startsWith("/upsell") || hash === "#/upsell" || hash === "#upsell") {
    return "upsell";
  }
  if (path === "/downsell" || path.startsWith("/downsell") || hash === "#/downsell" || hash === "#downsell") {
    return "downsell";
  }
  if (path === "/thank-you" || path.startsWith("/thank-you") || hash === "#/thank-you" || hash === "#thank-you") {
    return "thank-you";
  }
  return "home";
}

interface Pillar {
  id: string;
  num: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  points: string[];
}

const pillars: Pillar[] = [
  {
    id: "setup",
    num: "1",
    label: "SET UP",
    icon: <Wrench className="w-4 h-4" />,
    title: "1. SET UP",
    subtitle: "Start with the equipment you actually need.",
    points: [
      "Three setup levels: Budget, Mobile and Pro",
      "Essential versus optional equipment",
      "Startup budget plan",
      "Services you can safely offer",
      "No shop or trailer required to begin"
    ]
  },
  {
    id: "price",
    num: "2",
    label: "PRICE",
    icon: <Calculator className="w-4 h-4" />,
    title: "2. PRICE",
    subtitle: "Know what to charge before accepting the job.",
    points: [
      "South African pricing method",
      "Product, labour and transport calculations",
      "Hatchback, sedan, SUV and bakkie pricing",
      "Pet hair, stains and excessive-dirt extras",
      "Profit-per-job calculator",
      "Travel-radius and call-out rules"
    ]
  },
  {
    id: "sell",
    num: "3",
    label: "SELL",
    icon: <MessageSquare className="w-4 h-4" />,
    title: "3. SELL",
    subtitle: "Turn your service into an offer customers understand.",
    points: [
      "Three ready-made service packages",
      "Editable price lists and flyers",
      "50 WhatsApp sales messages",
      "First-customer outreach strategy",
      "Residential-complex promotion plan",
      "Uber, Bolt and small-fleet offers"
    ]
  },
  {
    id: "deliver",
    num: "4",
    label: "DELIVER",
    icon: <Check className="w-4 h-4" />,
    title: "4. DELIVER",
    subtitle: "Complete every job professionally.",
    points: [
      "Booking and customer-intake form",
      "Pre-existing damage inspection",
      "Job completion checklist",
      "Payment and follow-up messages",
      "Review and referral requests",
      "Repeat-booking system"
    ]
  }
];

const receiveItems = [
  "Mobile Car Wash Launch Manual",
  "Three-Level Equipment Plan",
  "Startup Budget Calculator",
  "South African Pricing Calculator",
  "Profit-Per-Job Calculator",
  "Three Ready-to-Sell Service Packages",
  "Editable Price List and Flyer Templates",
  "Customer Booking and Inspection Forms",
  "Professional Job Checklists",
  "First-Customer Action Plan"
];

const bonuses = [
  {
    num: "BONUS 1",
    title: "50 WhatsApp Sales Scripts",
    desc: "Ready-to-send messages for quotes, deposits, reminders, upgrades and rebookings.",
    avif: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820584/bonus-1-whatsapp-sales-scripts-hd_etlwnu.avif",
    webp: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820584/bonus-1-whatsapp-sales-scripts-hd_ksh74g.webp",
    alt: "Bonus 1 - WhatsApp Sales Scripts"
  },
  {
    num: "BONUS 2",
    title: "Editable Marketing Kit",
    desc: "Customizable flyers, price lists, WhatsApp status creatives and referral cards.",
    avif: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820585/bonus-2-marketing-kit-hd_nuccgy.avif",
    webp: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820585/bonus-2-marketing-kit-hd_i0zje4.webp",
    alt: "Bonus 2 - Marketing Kit"
  },
  {
    num: "BONUS 3",
    title: "Residential Complex Client Kit",
    desc: "Proposals, pitch emails and booking structure for multi-car wash days.",
    avif: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820592/bonus-3-complex-client-kit-hd_uf1zro.avif",
    webp: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820592/bonus-3-complex-client-kit-hd_ejhsrd.webp",
    alt: "Bonus 3 - Complex Client Kit"
  },
  {
    num: "BONUS 4",
    title: "Uber, Bolt & Fleet Offer Kit",
    desc: "Targeted packages and outreach scripts for drivers and local business fleets.",
    avif: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820569/bonus-4-driver-fleet-kit-hd_c1pvdk.avif",
    webp: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820569/bonus-4-driver-fleet-kit-hd_v6izx4.webp",
    alt: "Bonus 4 - Driver & Fleet Kit"
  },
  {
    num: "BONUS 5",
    title: "First 7 Customers Action Plan",
    desc: "Direct local outreach blueprint to secure your first paying clients fast.",
    avif: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820569/bonus-5-first-7-customers-hd_fbkece.avif",
    webp: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820569/bonus-5-first-7-customers-hd_fz5cmk.webp",
    alt: "Bonus 5 - First 7 Customers"
  },
  {
    num: "BONUS 6",
    title: "Repeat Customer Retention Kit",
    desc: "Inspection forms, follow-ups and workflows to lock in fortnightly repeat jobs.",
    avif: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820569/bonus-6-repeat-customer-kit-hd_kzf928.avif",
    webp: "https://res.cloudinary.com/dgncwrnvw/image/upload/v1786820568/bonus-6-repeat-customer-kit-hd_kzlsfg.webp",
    alt: "Bonus 6 - Repeat Customer Kit"
  }
];

interface Review {
  name: string;
  location: string;
  role: string;
  rating: number;
  highlight: string;
  text: string;
  avatar: string;
}

const reviews: Review[] = [
  {
    name: "Sipho M.",
    location: "Johannesburg, GP",
    role: "Mobile Detailer",
    rating: 5,
    highlight: "Booked 8 clients in my first weekend",
    text: "The WhatsApp message templates alone landed me 8 clients in my first weekend at my complex in Sandton. I went from having zero bookings to having a full Saturday schedule.",
    avatar: siphoImg
  },
  {
    name: "Dyllan V.",
    location: "Durban, KZN",
    role: "Van-Based Mobile Wash",
    rating: 5,
    highlight: "Pricing calculator saved my margins",
    text: "The pricing calculator saved me from making huge mistakes. I was undercharging for bakkies and SUVs. Now my profit margins are crystal clear and every wash is actually profitable.",
    avatar: dyllanImg
  },
  {
    name: "Thabo N.",
    location: "Pretoria, GP",
    role: "Weekend Starter",
    rating: 5,
    highlight: "Paid back the $4.90 on wash #1",
    text: "I started with just the budget bucket-and-hose setup described in Pillar 1. Clear, practical, zero fluff. Paid back the $4.90 cost of the kit on my very first wash.",
    avatar: thaboImg
  },
  {
    name: "Lerato K.",
    location: "Cape Town, WC",
    role: "Residential Complex Operator",
    rating: 5,
    highlight: "Secured a 120-unit estate contract",
    text: "The residential complex proposal template got us an agreement with a 120-unit estate in Century City. We wash 15 cars every Tuesday now. Best business investment I made this year.",
    avatar: leratoImg
  },
  {
    name: "Brian M.",
    location: "Gqeberha, EC",
    role: "Full-Time Mobile Pro",
    rating: 5,
    highlight: "Saved R5,000 on unnecessary gear",
    text: "Straight to the point and tailor-made for South Africa. No generic overseas advice. The equipment checklist prevented me from wasting R5,000 on unnecessary gear at Builders Warehouse.",
    avatar: brianImg
  }
];

const HOTMART_CHECKOUT_URL = "https://pay.hotmart.com/C107182351N?checkoutMode=10";

function FAQ({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq">
      <button onClick={() => setOpen(!open)} type="button">
        <span>{q}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180 text-blue-400" : "text-slate-400"}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function Title({ top, light = false, children }: { top: string; light?: boolean; children: React.ReactNode }) {
  return (
    <div className={`title ${light ? "light" : ""}`}>
      <p>{top}</p>
      <h2>{children}</h2>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(getRoute());
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  if (route === "upsell") {
    return <UpsellPage />;
  }

  if (route === "downsell") {
    return <DownsellPage />;
  }

  if (route === "thank-you") {
    return <ThankYouPage />;
  }

  const toOffer = () => document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" });

  // 15-minute countdown timer (900 seconds)
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const [zarRate, setZarRate] = useState<number>(18.25);

  useEffect(() => {
    let isMounted = true;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.rates?.ZAR && typeof data.rates.ZAR === "number") {
          setZarRate(data.rates.ZAR);
        }
      })
      .catch(() => {
        // Fallback already set to default
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 15 * 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const zarPriceFormatted = Math.round(4.90 * zarRate);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <main>
      {/* RED TIMER TOPBAR */}
      <div className="topbar">
        <span className="flex items-center gap-1.5 font-black uppercase tracking-wider text-xs sm:text-sm">
          <Timer className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span>SPECIAL LAUNCH OFFER EXPIRES IN:</span>
        </span>
        <span className="timer-badge">
          {formattedTime}
        </span>
        <span className="hidden sm:inline text-white/70">•</span>
        <span className="text-xs sm:text-sm font-semibold">
          COMPLETE SYSTEM FOR <b>$4.90</b>
        </span>
      </div>

      {/* 1. HERO */}
      <section className="hero wrap">
        <span className="kicker">NO SHOP. NO RENT. NO RANDOM PRICES.</span>
        <h1>
          DIRTY CARS ARE EVERYWHERE.<br />
          <em>WHY AREN’T YOU GETTING PAID TO WASH THEM?</em>
        </h1>
        <p className="lead">
          Get the equipment plan, South African pricing system, ready-made service packages and customer-getting tools to launch your mobile car wash.
        </p>

        {/* PRODUCT MOCKUP */}
        <div className="mockup">
          <picture>
            <source
              srcSet="https://res.cloudinary.com/dgncwrnvw/image/upload/v1786821054/ChatGPT_Image_15_ago_2026_16_09_34_nmb33a.avif"
              type="image/avif"
            />
            <source
              srcSet="https://res.cloudinary.com/dgncwrnvw/image/upload/v1786821054/ChatGPT_Image_15_ago_2026_16_09_34_nycjum.webp"
              type="image/webp"
            />
            <img
              src="https://res.cloudinary.com/dgncwrnvw/image/upload/v1786821054/ChatGPT_Image_15_ago_2026_16_09_34_nycjum.webp"
              alt="Mobile Car Wash Cash Kit - Product Mockup"
              referrerPolicy="no-referrer"
              className="max-w-full w-auto max-h-[500px] rounded-2xl shadow-2xl object-contain mx-auto transition-transform hover:scale-[1.02] duration-300"
            />
          </picture>
        </div>

        <button className="cta green mx-auto" onClick={toOffer}>
          <span>START MY MOBILE CAR WASH</span>
        </button>

        <div className="trust">
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant digital access</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Use it on your phone or computer</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>7-day refund guarantee</span>
          </span>
        </div>
      </section>

      {/* 2. PROBLEM */}
      <section className="dark">
        <div className="wrap narrow">
          <Title light top="STOP GUESSING. START BUILDING.">
            Want to start a mobile car wash—but still don’t know where to begin?
          </Title>

          <p className="text-center text-slate-300 text-base max-w-xl mx-auto -mt-4 mb-6">
            Maybe you are stuck because:
          </p>

          <div className="pain-grid">
            {[
              "You don’t know which equipment you actually need.",
              "You are worried about spending money before finding customers.",
              "You don’t know what to charge for different vehicles.",
              "You copy other car washes without knowing their costs.",
              "You don’t have professional packages ready to send.",
              "You don’t know how to approach your first customers."
            ].map((p, idx) => (
              <div className="pain" key={idx}>
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm mt-8 italic">
            Watching more videos will not build the offer for you.
          </p>
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section className="white">
        <div className="wrap narrow">
          <Title top="THE COMPLETE START-TO-CUSTOMER SYSTEM">
            We built the mobile car wash system.<br />
            <em>You put it to work.</em>
          </Title>

          {/* 4 STAGES OVERVIEW GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {pillars.map((p) => (
              <div 
                key={p.id} 
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase mb-1">
                  <span className="p-1 rounded bg-blue-50 text-blue-600">{p.icon}</span>
                  <span>{p.title}</span>
                </div>
                <p className="text-slate-900 font-bold text-sm mb-3">{p.subtitle}</p>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {p.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* SOLUTION SUMMARY COPY */}
          <div className="text-center mt-12 space-y-2 text-slate-700">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
              Open the kit, choose your setup and build your offer.
            </h3>

            <div className="pt-4">
              <button className="cta green mx-auto" onClick={toOffer}>
                <span>GET THE COMPLETE SYSTEM</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU RECEIVE */}
      <section className="grey">
        <div className="wrap">
          <Title top="EVERYTHING IS ALREADY PREPARED">
            This is not just another “how to start a business” ebook.
          </Title>

          <p className="text-center text-slate-700 font-bold text-lg max-w-xl mx-auto -mt-4 mb-8">
            You receive:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 max-w-3xl mx-auto mb-16">
            {receiveItems.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  {idx + 1}
                </div>
                <b className="text-slate-900 text-sm font-bold">{item}</b>
              </div>
            ))}
          </div>

          <div className="text-center mb-8 border-t border-slate-200 pt-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Plus practical bonus kits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bonuses.map((b, idx) => (
              <article
                key={idx}
                className="bg-white border-2 border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-center"
              >
                <div>
                  <div className="mb-3">
                    <span className="inline-block font-black text-blue-600 text-sm tracking-wider uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
                      {b.num}
                    </span>
                  </div>
                  <div className="w-full rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 mb-4">
                    <picture>
                      <source srcSet={b.avif} type="image/avif" />
                      <source srcSet={b.webp} type="image/webp" />
                      <img
                        src={b.webp}
                        alt={b.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-contain rounded-lg transition-transform duration-300 hover:scale-[1.03]"
                      />
                    </picture>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 text-center">
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-tight mb-1">
                    {b.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed m-0">
                    {b.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OFFER */}
      <section className="dark" id="offer">
        <div className="wrap narrow">
          <Title light top="ONE SIMPLE OFFER">
            STOP WATCHING OTHER PEOPLE START.<br />
            <em>BUILD YOUR MOBILE CAR WASH.</em>
          </Title>

          <div className="offer-card">
            <span className="badge">COMPLETE DIGITAL BUSINESS SYSTEM</span>
            <h3>MOBILE CAR WASH CASH KIT</h3>
            <p className="subtitle">Complete launch system + calculators + templates + six bonus kits.</p>

            <div className="my-6 max-w-sm mx-auto p-2 bg-slate-900/80 rounded-2xl border border-slate-700/60 shadow-xl">
              <picture>
                <source
                  srcSet="https://res.cloudinary.com/dgncwrnvw/image/upload/v1786821054/ChatGPT_Image_15_ago_2026_16_09_34_nmb33a.avif"
                  type="image/avif"
                />
                <source
                  srcSet="https://res.cloudinary.com/dgncwrnvw/image/upload/v1786821054/ChatGPT_Image_15_ago_2026_16_09_34_nycjum.webp"
                  type="image/webp"
                />
                <img
                  src="https://res.cloudinary.com/dgncwrnvw/image/upload/v1786821054/ChatGPT_Image_15_ago_2026_16_09_34_nycjum.webp"
                  alt="Mobile Car Wash Cash Kit Package"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto rounded-xl object-contain mx-auto transition-transform hover:scale-[1.02] duration-300"
                />
              </picture>
            </div>

            <div className="offer-features-box">
              <h4>What's included inside:</h4>
              <ul>
                {[
                  "Equipment and startup plan",
                  "South African pricing system",
                  "Profit calculator tool",
                  "Three service packages",
                  "Customer forms & checklists",
                  "50 WhatsApp message templates",
                  "Editable marketing materials",
                  "Residential-complex strategy",
                  "Driver & fleet offer kit",
                  "Instant digital access",
                  "7-day money-back guarantee"
                ].map((x, idx) => (
                  <li key={idx}>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="price">
              <small>SPECIAL LAUNCH OFFER</small>
              <div className="price-row">
                <s>$29.00</s>
                <div className="price-main-wrap">
                  <b>$4.90</b>
                  <span className="price-zar-conv" title="Converted dynamically from USD to South African Rand">
                    (≈ R{zarPriceFormatted} ZAR)
                  </span>
                </div>
                <span className="save-badge">SAVE 83%</span>
              </div>
              <span className="terms">One-time payment • Lifetime digital access on all devices</span>
            </div>

            <a 
              className="cta green full flex items-center justify-center text-center font-black tracking-wide cursor-pointer" 
              href={HOTMART_CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // Ensure instant opening even in sandboxed preview iframe
                try {
                  window.open(HOTMART_CHECKOUT_URL, "_blank", "noopener,noreferrer");
                } catch {
                  // Fallback
                  window.location.href = HOTMART_CHECKOUT_URL;
                }
              }}
            >
              <span>START MY MOBILE CAR WASH</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. REVIEWS / SOCIAL PROOF */}
      <section className="reviews-section">
        <div className="max-w-6xl mx-auto px-4">
          <Title top="WHAT SOUTH AFRICAN OPERATORS SAY" light>
            Results from operators across South Africa
          </Title>

          <div className="reviews-grid">
            {reviews.map((rev, idx) => (
              <div key={idx} className="review-card">
                <div>
                  <div className="review-stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <h4 className="review-highlight">"{rev.highlight}"</h4>
                  <p className="review-text">{rev.text}</p>
                </div>

                <div className="review-author">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    referrerPolicy="no-referrer"
                    className="review-avatar-img"
                  />
                  <div className="review-info">
                    <div className="review-name">
                      <span>{rev.name}</span>
                    </div>
                    <span className="review-meta">{rev.role} • {rev.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GUARANTEE */}
      <section className="guarantee">
        <div className="guarantee-container">
          <div className="guarantee-card">
            <div className="guarantee-badge-wrap">
              <div className="guarantee-icon-ring">
                <ShieldCheck className="w-8 h-8 text-amber-400" />
              </div>
              <span className="guarantee-pill">100% RISK-FREE PROTECTION</span>
            </div>

            <h2 className="guarantee-title">
              7-Day "Inspect Everything" Guarantee
            </h2>
            <p className="guarantee-subtitle">
              Download the entire Mobile Car Wash Cash Kit today. Read every operational guide, test the pricing calculators with your own figures, and review all 6 included bonus kits.
            </p>

            <div className="guarantee-pillars-grid">
              <div className="guarantee-pillar-item">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-bold text-white text-sm sm:text-base">Instant Unlocked Access</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Explore every spreadsheet, checklist, and script immediately on any device.</p>
                </div>
              </div>

              <div className="guarantee-pillar-item">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-bold text-white text-sm sm:text-base">7 Full Days to Evaluate</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Take a full week to test the system against your local South African market.</p>
                </div>
              </div>

              <div className="guarantee-pillar-item">
                <Lock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-bold text-white text-sm sm:text-base">Zero-Hassle Protection</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5">If you feel it's not right for you, claim a full prompt refund via the checkout platform.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="white faq-section">
        <div className="faq-wrap">
          <Title top="BEFORE YOU START">Frequently asked questions</Title>
          <FAQ q="What exactly do I receive?">
            You receive the complete Mobile Car Wash Cash Kit: the launch manual, equipment plan, pricing tools, service packages, customer forms, WhatsApp messages, marketing templates and six bonus kits.
          </FAQ>
          <FAQ q="Is this a physical product?">
            No. Everything is delivered digitally. You can access the materials from your phone, tablet or computer and print selected pages when useful.
          </FAQ>
          <FAQ q="Do I need a car wash property?">
            No. The system is designed around mobile services. Your exact setup will depend on your transport, access to water and electricity, local requirements and chosen services.
          </FAQ>
          <FAQ q="Do I need expensive equipment?">
            No. The kit separates essential equipment from optional upgrades, helping you avoid buying everything before testing demand.
          </FAQ>
          <FAQ q="Will the kit tell me exactly what to charge?">
            You receive example packages and a pricing system. Because costs differ by location and operator, the calculator helps you determine prices based on your own products, labour, transport and job conditions.
          </FAQ>
          <FAQ q="Can I use the materials on WhatsApp?">
            Yes. The price lists, service menus and customer messages are designed for a simple WhatsApp-based business workflow.
          </FAQ>
          <FAQ q="Does the kit guarantee customers or income?">
            No. The kit gives you the tools and process to build and promote your service. Results depend on your execution, local market, pricing and service quality.
          </FAQ>
          <FAQ q="How does the guarantee work?">
            Your purchase is covered by the seven-day refund period available through the checkout platform.
          </FAQ>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="final">
        <h2>
          THE CARS ARE ALREADY THERE.<br />
          <em>BUILD THE SERVICE.</em>
        </h2>
        <div className="final-steps">
          <div className="step-item">
            <span className="step-num">1</span>
            <span>Choose your setup.</span>
          </div>
          <div className="step-item">
            <span className="step-num">2</span>
            <span>Calculate your prices.</span>
          </div>
          <div className="step-item">
            <span className="step-num">3</span>
            <span>Prepare your offer.</span>
          </div>
          <div className="step-item">
            <span className="step-num">4</span>
            <span>Start approaching local car owners.</span>
          </div>
        </div>
        <button className="cta yellow mx-auto" onClick={toOffer}>
          <span>GET THE COMPLETE CASH KIT</span>
        </button>
      </section>

      {/* FOOTER */}
      <footer>
        © {new Date().getFullYear()} Mobile Car Wash Cash Kit. All rights reserved.
        <span>
          Educational business material. No earnings, customer or business outcome is guaranteed. 
          All trademarks and brand names are property of their respective owners.
        </span>
      </footer>
    </main>
  );
}
