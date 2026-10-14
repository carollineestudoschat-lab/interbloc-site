import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INTER BLOC | Pisos intertravados em Fortaleza",
  description: "Fabricação e comercialização de pisos intertravados e pré-moldados de concreto em Fortaleza, Ceará. Conheça os pisos H6 e H8 e solicite um orçamento.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
