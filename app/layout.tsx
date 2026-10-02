import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corredor · Demo de remesas con stablecoins",
  description:
    "Prototipo no-custodial (testnet) de envío de remesas Chile → Venezuela / Haití. Demo educativa, no es un servicio financiero.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header className="border-b border-white/10">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">🪙</span>
              <span>
                Corredor<span className="text-brand-500">.</span>
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-slate-300">
              <Link href="/enviar" className="hover:text-white">
                Enviar
              </Link>
              <Link href="/cumplimiento" className="hover:text-white">
                Cumplimiento
              </Link>
              <a
                href="https://github.com/Freddyohlo"
                className="hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>

        <footer className="mx-auto max-w-5xl px-4 pb-10 text-xs text-slate-400">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <strong className="text-amber-300">Demo educativa.</strong> Prototipo
            no-custodial en testnet (Sepolia) con datos y tasas ficticias. No
            custodia fondos, no mueve dinero real y no es un servicio financiero.
            Ver{" "}
            <Link href="/cumplimiento" className="underline">
              nota de cumplimiento
            </Link>
            .
          </div>
          <p className="mt-4">
            © {new Date().getFullYear()} Freddy Pérez · Proyecto de portafolio
          </p>
        </footer>
      </body>
    </html>
  );
}
