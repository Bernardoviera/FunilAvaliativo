export type ItemStatus = "good" | "warning" | "critical";

export interface ScoreItem {
  id: string;
  label: string;
  description: string;
  status: ItemStatus;
}

export interface ScoreResult {
  score: number;
  grade: "A" | "B" | "C" | "D";
  items: ScoreItem[];
}

// djb2 hash — deterministic for the same string
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // unsigned 32-bit
}

// Mulberry32 PRNG seeded by hash
function mulberry32(seed: number) {
  let s = seed;
  return function (): number {
    s += 0x6d2b79f5;
    let z = s;
    z = Math.imul(z ^ (z >>> 15), z | 1);
    z ^= z + Math.imul(z ^ (z >>> 7), z | 61);
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
}

const EVALUATION_ITEMS: Omit<ScoreItem, "status">[] = [
  {
    id: "loading_speed",
    label: "Velocidade de carregamento",
    description: "Tempo até o primeiro conteúdo visível (LCP)",
  },
  {
    id: "value_proposition",
    label: "Clareza da proposta de valor",
    description: "O visitante entende imediatamente o que você oferece",
  },
  {
    id: "cta_positioning",
    label: "Posicionamento dos CTAs",
    description: "Botões de ação visíveis e estrategicamente posicionados",
  },
  {
    id: "color_contrast",
    label: "Paleta de cores e contraste",
    description: "Hierarquia visual e legibilidade do conteúdo",
  },
  {
    id: "social_proof",
    label: "Prova social e depoimentos",
    description: "Elementos de credibilidade e confiança",
  },
];

// Weight map: higher weight = higher probability of being "good"
// We intentionally keep some items harder to make "good" (to generate urgency)
const ITEM_WEIGHTS: Record<string, [number, number, number]> = {
  // [P(good), P(warning), P(critical)]
  loading_speed: [0.25, 0.45, 0.30],
  value_proposition: [0.20, 0.45, 0.35],
  cta_positioning: [0.25, 0.40, 0.35],
  color_contrast: [0.30, 0.45, 0.25],
  social_proof: [0.20, 0.45, 0.35],
};

function pickStatus(rand: () => number, weights: [number, number, number]): ItemStatus {
  const r = rand();
  if (r < weights[0]) return "good";
  if (r < weights[0] + weights[1]) return "warning";
  return "critical";
}

function scoreToGrade(score: number): "A" | "B" | "C" | "D" {
  if (score >= 80) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  return "D";
}

export function generateScore(url: string): ScoreResult {
  const seed = djb2Hash(url.trim().toLowerCase());
  const rand = mulberry32(seed);

  // Score between 42 and 72 (always room to improve)
  const score = Math.floor(rand() * 31) + 42;
  const grade = scoreToGrade(score);

  const items: ScoreItem[] = EVALUATION_ITEMS.map((item) => ({
    ...item,
    status: pickStatus(rand, ITEM_WEIGHTS[item.id]),
  }));

  // Guarantee at least 2 non-good items so there's always a hook
  const nonGoodCount = items.filter((i) => i.status !== "good").length;
  if (nonGoodCount < 2) {
    // Force the last two items to warning/critical
    for (let i = items.length - 1; i >= 0 && items.filter((x) => x.status !== "good").length < 2; i--) {
      if (items[i].status === "good") {
        items[i] = { ...items[i], status: "warning" };
      }
    }
  }

  return { score, grade, items };
}
