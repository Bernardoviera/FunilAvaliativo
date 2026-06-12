"use client";

import { useEffect, useState } from "react";
import { Cpu } from "lucide-react";

interface Props {
  url: string;
  onComplete: () => void;
}

const STEPS = [
  "Acessando página…",
  "Analisando estrutura visual…",
  "Verificando elementos de conversão…",
  "Avaliando copy e CTAs…",
  "Calculando pontuação final…",
];

const TOTAL_DURATION = 7000; // ms
const STEP_INTERVAL = 1300; // ms per message

export default function LoadingScreen({ url, onComplete }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  // Cycle through step messages
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1;
        if (next >= STEPS.length) {
          clearInterval(interval);
          return prev;
        }
        return next;
      });
    }, STEP_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Smooth progress bar
  useEffect(() => {
    const startTime = Date.now();
    let raf: number;

    function tick() {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Trigger completion after total duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Small delay to let fade-out finish
      setTimeout(onComplete, 300);
    }, TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const displayUrl =
    url.length > 45 ? url.slice(0, 42) + "…" : url;

  return (
    <div
      className={`max-w-lg mx-auto w-full transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Cpu size={32} className="text-blue-600 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-center mb-2">
          Analisando sua página
        </h2>
        <p className="text-sm text-slate-400 text-center mb-8 font-mono truncate">
          {displayUrl}
        </p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-slate-400">Progresso</span>
            <span className="text-xs font-semibold text-blue-600">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>

        {/* Step messages */}
        <div className="space-y-2 mt-6">
          {STEPS.map((step, i) => {
            const done = i < stepIndex;
            const active = i === stepIndex;
            return (
              <div
                key={step}
                className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-300 ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : done
                    ? "text-slate-400"
                    : "text-slate-200"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                    active
                      ? "bg-blue-500 animate-pulse"
                      : done
                      ? "bg-green-400"
                      : "bg-slate-200"
                  }`}
                />
                <span
                  className={`text-sm font-medium transition-all duration-300 ${
                    active ? "opacity-100" : done ? "opacity-60" : "opacity-30"
                  }`}
                >
                  {step}
                </span>
                {done && (
                  <svg
                    className="ml-auto w-4 h-4 text-green-500 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
