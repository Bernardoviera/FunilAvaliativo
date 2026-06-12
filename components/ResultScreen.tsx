"use client";

import { ExternalLink, RotateCcw, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react";
import type { ScoreResult, ItemStatus } from "@/lib/scoreGenerator";

interface Props {
  result: ScoreResult;
  url: string;
  onReset: () => void;
}

const STATUS_CONFIG: Record<
  ItemStatus,
  { label: string; icon: React.ReactNode; bg: string; text: string; border: string }
> = {
  good: {
    label: "Bom",
    icon: <CheckCircle2 size={18} className="text-green-500 shrink-0" />,
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-100",
  },
  warning: {
    label: "Pode melhorar",
    icon: <AlertTriangle size={18} className="text-amber-500 shrink-0" />,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
  },
  critical: {
    label: "Crítico",
    icon: <XCircle size={18} className="text-red-500 shrink-0" />,
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-100",
  },
};

const GRADE_CONFIG: Record<
  "A" | "B" | "C" | "D",
  { color: string; ring: string; label: string }
> = {
  A: { color: "text-green-600", ring: "ring-green-400", label: "Excelente" },
  B: { color: "text-blue-600", ring: "ring-blue-400", label: "Bom" },
  C: { color: "text-amber-600", ring: "ring-amber-400", label: "Regular" },
  D: { color: "text-red-600", ring: "ring-red-400", label: "Crítico" },
};

export default function ResultScreen({ result, url, onReset }: Props) {
  const formUrl =
    process.env.NEXT_PUBLIC_FORM_URL ?? "https://forms.example.com/minha-consultoria";

  const displayUrl = url.length > 40 ? url.slice(0, 37) + "…" : url;
  const gradeConf = GRADE_CONFIG[result.grade];

  const criticalCount = result.items.filter((i) => i.status === "critical").length;
  const warningCount = result.items.filter((i) => i.status === "warning").length;
  const goodCount = result.items.filter((i) => i.status === "good").length;

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 mb-5">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Score circle */}
          <div
            className={`shrink-0 w-28 h-28 rounded-full ring-4 ${gradeConf.ring} flex flex-col items-center justify-center bg-white shadow-sm`}
          >
            <span className={`text-4xl font-extrabold ${gradeConf.color}`}>
              {result.grade}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-0.5">
              {result.score}/100
            </span>
          </div>

          {/* Summary */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
              Análise concluída
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-1">
              Sua página recebeu nota{" "}
              <span className={gradeConf.color}>{result.grade}</span> —{" "}
              {gradeConf.label}
            </h2>
            <p className="text-sm text-slate-500 font-mono">{displayUrl}</p>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-3 mt-4 justify-center sm:justify-start">
              {criticalCount > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                  <XCircle size={12} />
                  {criticalCount} crítico{criticalCount > 1 ? "s" : ""}
                </span>
              )}
              {warningCount > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-600 text-xs font-semibold px-3 py-1 rounded-full">
                  <AlertTriangle size={12} />
                  {warningCount} ponto{warningCount > 1 ? "s" : ""} de melhoria
                </span>
              )}
              {goodCount > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                  <CheckCircle2 size={12} />
                  {goodCount} aprovado{goodCount > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Items list */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 mb-5">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={20} className="text-blue-600" />
          <h3 className="font-bold text-slate-900 text-lg">
            Detalhamento por categoria
          </h3>
        </div>

        <div className="space-y-3">
          {result.items.map((item) => {
            const conf = STATUS_CONFIG[item.status];
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 p-4 rounded-xl border ${conf.bg} ${conf.border}`}
              >
                {conf.icon}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${conf.bg} ${conf.text}`}
                >
                  {conf.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA block */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200 mb-2">
          Próximo passo
        </p>
        <h3 className="text-xl sm:text-2xl font-extrabold mb-2 leading-snug">
          Sua página está perdendo vendas agora.
        </h3>
        <p className="text-blue-100 text-sm mb-6 leading-relaxed">
          Com {criticalCount + warningCount} ponto{criticalCount + warningCount !== 1 ? "s" : ""} identificado
          {criticalCount + warningCount !== 1 ? "s" : ""}, cada dia sem corrigir é receita deixada na mesa.
          Fale com um especialista e receba um plano de ação personalizado.
        </p>
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 active:scale-95 transition-all duration-150 text-sm sm:text-base shadow-lg w-full sm:w-auto justify-center"
        >
          Quero melhorar minha página
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm transition-colors"
        >
          <RotateCcw size={14} />
          Analisar outra página
        </button>
      </div>
    </div>
  );
}
