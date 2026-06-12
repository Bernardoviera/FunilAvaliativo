"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { ScoreItem, ItemStatus } from "@/lib/scoreGenerator";

interface Props {
  url: string;
  items: ScoreItem[];
}

const DOT_COLOR: Record<ItemStatus, string> = {
  good:     "bg-green-500",
  warning:  "bg-amber-500",
  critical: "bg-red-500",
};

function toHref(raw: string): string {
  const t = raw.trim();
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}

export default function PagePreview({ url, items }: Props) {
  const href = toHref(url);
  const displayUrl = url.length > 52 ? url.slice(0, 49) + "…" : url;

  // thum.io: free screenshot service, no API key required
  const screenshotSrc = `https://image.thum.io/get/width/800/crop/500/${href}`;

  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 mb-5">
      {/* Card header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Visualização da página analisada
        </span>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
        >
          Abrir página
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Clickable browser window */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block mx-4 mt-3 rounded-t-lg overflow-hidden border border-slate-200 group"
        title="Clique para abrir a página"
      >
        {/* Chrome bar */}
        <div className="bg-slate-100 px-3 py-2 flex items-center gap-2.5 group-hover:bg-slate-200 transition-colors">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 bg-white rounded px-2.5 py-1 flex items-center gap-1.5 border border-slate-200 min-w-0">
            <svg className="w-2.5 h-2.5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[10px] text-slate-500 truncate font-mono">{displayUrl}</span>
            <ExternalLink size={9} className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors shrink-0" />
          </div>
        </div>

        {/* Page content */}
        <div className="relative overflow-hidden bg-slate-50" style={{ height: 220 }}>

          {/* Real screenshot — hidden until loaded */}
          {!error && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={screenshotSrc}
              alt="Screenshot da página"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
          )}

          {/* Skeleton — shown while loading or on error */}
          {!loaded && (
            <div className="absolute inset-0 bg-white">
              {/* Navbar skeleton */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
                <div className="h-4 w-20 bg-slate-300 rounded-md" />
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-8 bg-slate-200 rounded" />
                  <div className="h-2.5 w-8 bg-slate-200 rounded" />
                  <div className="h-2.5 w-8 bg-slate-200 rounded" />
                  <div className="h-6 w-14 bg-blue-200 rounded-full" />
                </div>
              </div>
              {/* Hero skeleton */}
              <div className="px-4 pt-4 space-y-2.5">
                <div className="h-6 bg-slate-200 rounded-md w-4/5" />
                <div className="h-4 bg-slate-200 rounded-md w-3/5" />
                <div className="h-4 bg-slate-200 rounded-md w-2/3" />
                <div className="h-8 w-28 bg-blue-100 rounded-lg mt-1" />
              </div>
              {/* Feature blocks skeleton */}
              <div className="flex gap-2 px-4 pt-4">
                <div className="h-10 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
                <div className="h-10 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
                <div className="h-10 bg-slate-100 rounded-lg flex-1 border border-slate-200" />
              </div>
              {/* Loading spinner — only if not an error */}
              {!error && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-white px-3 py-2 rounded-full shadow-sm border border-slate-100">
                    <div className="w-3.5 h-3.5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                    Carregando preview…
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Subtle bottom fade over the screenshot */}
          {loaded && !error && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />
          )}

        </div>
      </a>

      {/* Legend */}
      <div className="mx-4 mb-4 px-3 py-2.5 flex flex-wrap gap-x-4 gap-y-2 bg-slate-50 rounded-b-lg border border-t-0 border-slate-200">
        {items.map((item, i) => (
          <span key={item.id} className="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
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
