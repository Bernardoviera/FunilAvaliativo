"use client";

import type { ScoreItem, ItemStatus } from "@/lib/scoreGenerator";

interface Props {
  url: string;
  items: ScoreItem[];
}

const DOT_COLOR: Record<ItemStatus, string> = {
  good: "bg-green-500",
  warning: "bg-amber-500",
  critical: "bg-red-500",
};

// Each position maps to a skeleton zone
const POSITIONS = [
  { top: "9%",  left: "4%" },   // loading_speed  → hero top-left
  { top: "9%",  left: "52%" },  // image_quality  → hero top-right
  { top: "30%", left: "4%" },   // value_prop     → subtitle zone
  { top: "49%", left: "4%" },   // cta_position   → button zone
  { top: "49%", left: "52%" },  // color_contrast → button zone right
  { top: "73%", left: "4%" },   // social_proof   → features zone
];

export default function PagePreview({ url, items }: Props) {
  const displayUrl = url.length > 50 ? url.slice(0, 47) + "…" : url;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-5">
      {/* Browser chrome */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-amber-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 flex items-center gap-1.5 border border-slate-200 min-w-0">
          <svg
            className="w-3 h-3 text-green-500 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span className="text-[11px] text-slate-500 truncate font-mono">
            {displayUrl}
          </span>
        </div>
      </div>

      {/* Skeleton page + markers */}
      <div className="relative overflow-hidden bg-white" style={{ height: 220 }}>
        {/* Skeleton content */}
        <div className="p-4 space-y-3">
          {/* Hero heading */}
          <div className="h-7 bg-slate-200 rounded-md w-4/5" />
          {/* Subtitles */}
          <div className="h-4 bg-slate-200 rounded-md w-3/5" />
          <div className="h-4 bg-slate-200 rounded-md w-2/3" />
          {/* CTA button */}
          <div className="h-9 bg-blue-200 rounded-lg w-32" />
          {/* Feature blocks */}
          <div className="flex gap-2 pt-1">
            <div className="h-14 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
            <div className="h-14 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
            <div className="h-14 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
          </div>
        </div>

        {/* Bottom fade-out */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />

        {/* Analysis markers */}
        {items.map((item, i) => {
          const pos = POSITIONS[i];
          if (!pos) return null;
          return (
            <div
              key={item.id}
              className="absolute flex items-center gap-1.5"
              style={{
                top: pos.top,
                left: pos.left,
                animation: `fadeIn 0.35s ease-out ${0.15 + i * 0.08}s both`,
              }}
            >
              <div
                className={`w-5 h-5 rounded-full ${DOT_COLOR[item.status]} ring-2 ring-white shadow-md flex items-center justify-center shrink-0`}
              >
                <span className="text-[9px] font-bold text-white leading-none">
                  {i + 1}
                </span>
              </div>
              <span className="text-[10px] font-semibold bg-white/95 text-slate-700 px-1.5 py-0.5 rounded-md shadow border border-slate-100 whitespace-nowrap">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
