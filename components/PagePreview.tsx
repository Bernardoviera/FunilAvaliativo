"use client";

import type { ScoreItem, ItemStatus } from "@/lib/scoreGenerator";

interface Props {
  url: string;
  items: ScoreItem[];
}

const DOT_COLOR: Record<ItemStatus, string> = {
  good:    "bg-green-500",
  warning: "bg-amber-500",
  critical:"bg-red-500",
};

// Percentage positions inside the 230 px skeleton body
const POSITIONS = [
  { top: "14%", left: "76%" }, // 1 – loading_speed   → hero, top-right
  { top: "14%", left: "4%"  }, // 2 – image_quality   → hero, top-left
  { top: "40%", left: "4%"  }, // 3 – value_prop      → heading block
  { top: "59%", left: "28%" }, // 4 – cta_positioning → button
  { top: "4%",  left: "54%" }, // 5 – color_contrast  → navbar
  { top: "80%", left: "4%"  }, // 6 – social_proof    → features
];

export default function PagePreview({ url, items }: Props) {
  const displayUrl = url.length > 52 ? url.slice(0, 49) + "…" : url;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 mb-5">
      {/* Card header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Visualização da página analisada
        </span>
        <span className="text-xs text-slate-400">
          Os números correspondem ao detalhamento abaixo
        </span>
      </div>

      {/* Browser chrome */}
      <div className="mx-4 mt-3 rounded-t-lg overflow-hidden border border-slate-200">
        <div className="bg-slate-100 px-3 py-2 flex items-center gap-2.5">
          {/* Traffic lights */}
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          {/* URL bar */}
          <div className="flex-1 bg-white rounded px-2.5 py-1 flex items-center gap-1.5 border border-slate-200 min-w-0">
            <svg className="w-2.5 h-2.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[10px] text-slate-500 truncate font-mono">{displayUrl}</span>
          </div>
        </div>

        {/* Skeleton body */}
        <div className="relative overflow-hidden bg-white border-t border-slate-100" style={{ height: 230 }}>
          {/* Navbar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
            <div className="h-4 w-20 bg-slate-300 rounded-md" />
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-8 bg-slate-200 rounded" />
              <div className="h-2.5 w-8 bg-slate-200 rounded" />
              <div className="h-2.5 w-8 bg-slate-200 rounded" />
              <div className="h-6 w-14 bg-blue-200 rounded-full" />
            </div>
          </div>

          {/* Hero */}
          <div className="px-4 pt-4 space-y-2.5">
            <div className="h-6 bg-slate-300 rounded-md w-4/5" />
            <div className="h-4 bg-slate-200 rounded-md w-3/5" />
            <div className="h-4 bg-slate-200 rounded-md w-2/3" />
            <div className="h-8 w-28 bg-blue-300 rounded-lg mt-1" />
          </div>

          {/* Feature blocks */}
          <div className="flex gap-2 px-4 pt-4">
            <div className="h-12 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
            <div className="h-12 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
            <div className="h-12 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />

          {/* Analysis dots */}
          {items.map((item, i) => {
            const pos = POSITIONS[i];
            if (!pos) return null;
            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  top: pos.top,
                  left: pos.left,
                  animation: `fadeIn 0.3s ease-out ${0.1 + i * 0.07}s both`,
                }}
              >
                <div className={`w-6 h-6 rounded-full ${DOT_COLOR[item.status]} ring-2 ring-white shadow-lg flex items-center justify-center`}>
                  <span className="text-[10px] font-bold text-white leading-none">
                    {i + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend strip */}
      <div className="mx-4 mb-4 px-3 py-2 flex flex-wrap gap-x-4 gap-y-1.5 bg-slate-50 rounded-b-lg border border-t-0 border-slate-200">
        {items.map((item, i) => (
          <span key={item.id} className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className={`w-4 h-4 rounded-full ${DOT_COLOR[item.status]} flex items-center justify-center text-[9px] font-bold text-white shrink-0`}>
              {i + 1}
            </span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
