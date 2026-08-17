// Route: /thank-you
// Generic confirmation page. If Hotmart redirects with ?scale=1, the page also
// confirms that the Scale Blueprint was added.

import React from "react";
import {
  CheckCircle2,
  Download,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function ThankYouPage() {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const scaleBlueprintAdded = query?.get("scale") === "1";

  return (
    <main className="min-h-screen bg-slate-100 font-sans text-slate-950">
      <section className="relative overflow-hidden bg-[#071b2d] px-4 py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0b4a75_0%,#071b2d_42%,#020617_100%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-400/30 bg-emerald-400/15 shadow-[0_0_55px_rgba(52,211,153,.25)]">
            <CheckCircle2 className="h-11 w-11 text-emerald-400" />
          </div>
          <p className="mt-7 text-xs font-black uppercase tracking-[.24em] text-sky-400">Purchase confirmed</p>
          <h1 className="mt-3 text-4xl font-black uppercase leading-none sm:text-6xl">You are in.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-200">
            Your payment was processed successfully. Hotmart will send your receipt and access instructions to the email used during checkout.
          </p>
          {scaleBlueprintAdded && (
            <div className="mx-auto mt-7 max-w-2xl rounded-xl border border-yellow-300/30 bg-yellow-300/10 px-5 py-4 font-bold text-yellow-200">
              The Mobile Car Wash Scale Blueprint was also added to your order.
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[.2em] text-blue-600">What happens now</p>
            <h2 className="mt-3 text-3xl font-black uppercase sm:text-5xl">Your files are only a few clicks away.</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Mail className="h-6 w-6" />
              </div>
              <span className="mt-5 block text-xs font-black uppercase tracking-wider text-blue-600">Step 1</span>
              <h3 className="mt-1 text-xl font-black uppercase">Check your email</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Look for a Hotmart purchase confirmation sent to the same address used at checkout.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="mt-5 block text-xs font-black uppercase tracking-wider text-blue-600">Step 2</span>
              <h3 className="mt-1 text-xl font-black uppercase">Open your access</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Use the secure access link in the email to open the Hotmart area connected to your purchase.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Download className="h-6 w-6" />
              </div>
              <span className="mt-5 block text-xs font-black uppercase tracking-wider text-blue-600">Step 3</span>
              <h3 className="mt-1 text-xl font-black uppercase">Download the files</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Save the PDFs and spreadsheets to your phone or computer before beginning the Start Here guide.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-8 text-center text-xs leading-6 text-slate-500">
        © {new Date().getFullYear()} Mobile Car Wash Cash Kit. All rights reserved.
      </footer>
    </main>
  );
}
