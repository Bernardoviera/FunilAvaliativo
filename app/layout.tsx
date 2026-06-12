import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medidor de Qualidade de Página | Análise de Conversão",
  description:
    "Descubra o que está travando as conversões da sua página. Análise gratuita e instantânea dos pontos críticos que impedem suas vendas.",
  openGraph: {
    title: "Medidor de Qualidade de Página | Análise de Conversão",
    description:
      "Descubra o que está travando as conversões da sua página. Análise gratuita e instantânea.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
