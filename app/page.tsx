import Link from "next/link";
import { CORRIDOR_LIST } from "@/lib/corridors";
import { BANK_BENCHMARK_PCT } from "@/lib/quote";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <span className="badge">Prototipo · testnet Sepolia · no-custodial</span>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Envía dinero a tu familia en{" "}
          <span className="text-brand-500">segundos</span>, no en 72 horas.
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Corredor usa stablecoins (USDC) como riel de liquidación para conectar
          Chile con Venezuela y Haití. Esta demo muestra el cotizador, el flujo
          de estados y los controles de cumplimiento que un servicio real
          necesita.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/enviar" className="btn">
            Probar el envío
          </Link>
          <Link href="/cumplimiento" className="btn-ghost">
            Ver enfoque de cumplimiento
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <p className="text-3xl font-bold text-brand-500">&lt; 1%</p>
          <p className="mt-1 text-sm text-slate-300">
            Costo total estimado del corredor con stablecoin, frente a más de{" "}
            {(BANK_BENCHMARK_PCT * 100).toFixed(0)}% que pueden alcanzar los
            envíos a Latinoamérica (Banco Mundial).
          </p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-brand-500">Minutos</p>
          <p className="mt-1 text-sm text-slate-300">
            Liquidación en destino por Pago Móvil (VE) o MonCash (HT), frente a
            los hasta 3 días hábiles de la banca tradicional.
          </p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-brand-500">2</p>
          <p className="mt-1 text-sm text-slate-300">
            Corredores activos, cada uno con su perfil de sanciones y sus
            métodos de entrega locales.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Corredores disponibles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CORRIDOR_LIST.map((corridor) => (
            <div key={corridor.id} className="card space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{corridor.flag}</span>
                <div>
                  <p className="font-semibold">{corridor.country}</p>
                  <p className="text-xs text-slate-400">
                    Entrega en {corridor.currency} ({corridor.currencyCode})
                  </p>
                </div>
              </div>
              <ul className="space-y-1 text-sm text-slate-300">
                {corridor.methods.map((method) => (
                  <li key={method.id}>
                    · {method.label}{" "}
                    <span className="text-slate-500">({method.speed})</span>
                  </li>
                ))}
              </ul>
              <p className="rounded-lg border border-white/10 bg-slate-950/40 p-3 text-xs text-slate-400">
                ⚠️ {corridor.sanctionsNote}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Cómo funciona la demo</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
          <li>Eliges corredor y monto en pesos chilenos.</li>
          <li>
            El cotizador muestra el <strong>costo total real</strong> (no solo la
            comisión visible) y cuánto llega a destino.
          </li>
          <li>
            Pasas por verificación de identidad y screening de sanciones
            simulados.
          </li>
          <li>
            Se firma el envío de USDC en testnet y la transferencia avanza por
            sus estados hasta la entrega.
          </li>
        </ol>
      </section>
    </div>
  );
}
