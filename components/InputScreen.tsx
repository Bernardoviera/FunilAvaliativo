"use client";

import { useState, type FormEvent } from "react";
import { Search, Zap, BarChart2, ShieldCheck } from "lucide-react";

interface Props {
  onAnalyze: (url: string) => void;
}

export default function InputScreen({ onAnalyze }: Props) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!url.trim()) {
      setError("Cole o endereço da sua página para continuar.");
      return;
    }
    setError("");
    onAnalyze(url.trim());
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wide">
          <Zap size={12} className="fill-current" />
          Análise gratuita · Resultado em segundos
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 text-center leading-tight mb-4">
        Descubra o que está{" "}
        <span className="text-blue-600">travando as conversões</span> da sua
        página
      </h1>

      {/* Subheadline */}
      <p className="text-slate-500 text-center text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
        Nossa IA analisa mais de 20 fatores técnicos e de persuasão da sua
        página de vendas e entrega um relatório com os pontos críticos que
        impedem suas vendas.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              placeholder="Cole aqui o link da sua página (ex: meusite.com/vendas)"
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-0 transition-colors ${
                error
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-slate-200 bg-white focus:border-blue-500"
              }`}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold px-8 py-4 rounded-xl transition-all duration-150 text-sm sm:text-base whitespace-nowrap shadow-lg shadow-blue-200"
          >
            Analisar minha página
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500 pl-1">{error}</p>
        )}
      </form>

      {/* Trust badges */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: <BarChart2 size={20} className="text-blue-500" />,
            title: "20+ métricas",
            desc: "Análise completa de performance e conversão",
          },
          {
            icon: <Zap size={20} className="text-blue-500" />,
            title: "Resultado em 8s",
            desc: "Relatório detalhado em poucos segundos",
          },
          {
            icon: <ShieldCheck size={20} className="text-blue-500" />,
            title: "100% gratuito",
            desc: "Sem cadastro, sem cartão de crédito",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
          >
            <div className="mt-0.5 shrink-0">{item.icon}</div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {item.title}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
