"use client";

import { useState } from "react";
import InputScreen from "@/components/InputScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import { generateScore, type ScoreResult } from "@/lib/scoreGenerator";

type Screen = "input" | "loading" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("input");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ScoreResult | null>(null);

  function handleAnalyze(inputUrl: string) {
    setUrl(inputUrl);
    setScreen("loading");
  }

  function handleLoadingComplete() {
    const scoreResult = generateScore(url);
    setResult(scoreResult);
    setScreen("result");
  }

  function handleReset() {
    setUrl("");
    setResult(null);
    setScreen("input");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {screen === "input" && (
          <div className="animate-fade-in w-full">
            <InputScreen onAnalyze={handleAnalyze} />
          </div>
        )}
        {screen === "loading" && (
          <div className="animate-fade-in w-full">
            <LoadingScreen url={url} onComplete={handleLoadingComplete} />
          </div>
        )}
        {screen === "result" && result && (
          <div className="animate-fade-in w-full">
            <ResultScreen result={result} url={url} onReset={handleReset} />
          </div>
        )}
      </div>

      <footer className="py-6 px-4 text-center border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
          Análise automática gerada por IA com base em padrões de páginas de
          alta conversão. Os resultados são orientativos e não substituem uma
          auditoria profissional personalizada.
        </p>
      </footer>
    </main>
  );
}
