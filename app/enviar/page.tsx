"use client";

import { useMemo, useState } from "react";
import { CORRIDORS, CORRIDOR_LIST, type CorridorId } from "@/lib/corridors";
import {
  buildQuote,
  formatClp,
  formatLocal,
  formatPct,
  formatUsd,
} from "@/lib/quote";
import { screenCounterparty, type ScreeningResult } from "@/lib/screening";
import {
  TRANSFER_STEPS,
  createTransferId,
  fakeTxHash,
  type Transfer,
  type TransferStatus,
} from "@/lib/transfer";

type Phase = "formulario" | "kyc" | "screening" | "enviando" | "listo";

export default function EnviarPage() {
  const [corridorId, setCorridorId] = useState<CorridorId>("ve");
  const [methodId, setMethodId] = useState<string>(CORRIDORS.ve.methods[0].id);
  const [amountClp, setAmountClp] = useState<number>(150000);
  const [recipientName, setRecipientName] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");

  const [phase, setPhase] = useState<Phase>("formulario");
  const [screening, setScreening] = useState<ScreeningResult | null>(null);
  const [transfer, setTransfer] = useState<Transfer | null>(null);

  const corridor = CORRIDORS[corridorId];
  const method =
    corridor.methods.find((m) => m.id === methodId) ?? corridor.methods[0];

  const quote = useMemo(
    () => buildQuote(amountClp, corridor, method),
    [amountClp, corridor, method]
  );

  function selectCorridor(id: CorridorId) {
    setCorridorId(id);
    setMethodId(CORRIDORS[id].methods[0].id);
    reset();
  }

  function reset() {
    setPhase("formulario");
    setScreening(null);
    setTransfer(null);
  }

  function startVerification() {
    if (!recipientName.trim() || !recipientAccount.trim() || amountClp <= 0) {
      return;
    }
    setPhase("kyc");
  }

  function confirmKyc() {
    const result = screenCounterparty(recipientName, corridor.sanctionsNote);
    setScreening(result);
    setPhase("screening");
  }

  function proceedAfterScreening() {
    if (!screening?.passed) return;
    setPhase("enviando");
    setTransfer({
      id: createTransferId(),
      createdAt: new Date().toISOString(),
      corridorId,
      methodId: method.id,
      amountClp,
      recipientName,
      recipientAccount,
      status: "fondos_confirmados",
    });
    // Demo: simulate the on-chain send resolving.
    setTimeout(() => {
      setTransfer((prev) =>
        prev ? { ...prev, status: "enviada", txHash: fakeTxHash() } : prev
      );
      setTimeout(() => {
        setTransfer((prev) => (prev ? { ...prev, status: "entregada" } : prev));
        setPhase("listo");
      }, 1400);
    }, 1200);
  }

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Enviar dinero</h1>
        <p className="text-slate-300">
          Flujo de demostración. Ninguna transacción es real ni mueve fondos.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          {phase === "formulario" && (
            <section className="card space-y-5">
              <div>
                <span className="label">Corredor</span>
                <div className="flex gap-2">
                  {CORRIDOR_LIST.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => selectCorridor(c.id)}
                      className={
                        "flex-1 rounded-lg border px-3 py-2 text-sm transition " +
                        (corridorId === c.id
                          ? "border-brand-500 bg-brand-500/15"
                          : "border-white/10 hover:bg-white/5")
                      }
                    >
                      {c.flag} {c.country}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="label">Método de entrega en destino</span>
                <select
                  className="input"
                  value={methodId}
                  onChange={(e) => setMethodId(e.target.value)}
                >
                  {corridor.methods.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label} · {m.speed}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="label">Monto a enviar (CLP)</span>
                <input
                  className="input"
                  type="number"
                  min={1000}
                  step={1000}
                  value={amountClp}
                  onChange={(e) => setAmountClp(Number(e.target.value))}
                />
                <div className="mt-2 flex gap-2">
                  {[50000, 150000, 400000].map((preset) => (
                    <button
                      key={preset}
                      className="btn-ghost text-xs"
                      onClick={() => setAmountClp(preset)}
                    >
                      {formatClp(preset)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="label">Nombre del destinatario</span>
                  <input
                    className="input"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Ej: María Pérez"
                  />
                </div>
                <div>
                  <span className="label">
                    {corridor.currencyCode === "VES"
                      ? "Teléfono / cuenta destino"
                      : "MonCash / cuenta destino"}
                  </span>
                  <input
                    className="input"
                    value={recipientAccount}
                    onChange={(e) => setRecipientAccount(e.target.value)}
                    placeholder={
                      corridor.currencyCode === "VES"
                        ? "+58 412 000 0000"
                        : "+509 3000 0000"
                    }
                  />
                </div>
              </div>

              <button
                className="btn w-full"
                onClick={startVerification}
                disabled={
                  !recipientName.trim() ||
                  !recipientAccount.trim() ||
                  amountClp <= 0
                }
              >
                Continuar a verificación
              </button>
            </section>
          )}

          {phase === "kyc" && (
            <section className="card space-y-4">
              <h2 className="text-xl font-semibold">
                Verificación de identidad (simulada)
              </h2>
              <p className="text-sm text-slate-300">
                En un servicio real, aquí se valida la identidad del emisor y se
                aplica debida diligencia. Este paso es una simulación.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>✅ Identidad del emisor (cédula/pasaporte)</li>
                <li>✅ Datos del destinatario</li>
                <li>✅ Debida diligencia según corredor</li>
              </ul>
              <div className="flex gap-2">
                <button className="btn" onClick={confirmKyc}>
                  Verificación completa (demo)
                </button>
                <button className="btn-ghost" onClick={reset}>
                  Volver
                </button>
              </div>
            </section>
          )}

          {phase === "screening" && screening && (
            <section className="card space-y-4">
              <h2 className="text-xl font-semibold">
                Screening de sanciones (simulado)
              </h2>
              <div
                className={
                  "rounded-lg border p-4 text-sm " +
                  (screening.passed
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : "border-red-500/40 bg-red-500/10")
                }
              >
                <p className="font-semibold">
                  {screening.passed
                    ? "Sin coincidencias bloqueantes"
                    : "Coincidencia detectada: transferencia bloqueada"}
                </p>
                <p className="mt-1 text-slate-300">
                  Score de riesgo: {screening.riskScore}/100
                </p>
                <ul className="mt-2 space-y-1 text-slate-300">
                  {screening.reasons.map((reason) => (
                    <li key={reason}>· {reason}</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-slate-400">
                En producción, un hit SDN obliga a bloquear y reportar a OFAC
                dentro de 10 días hábiles.
              </p>
              <div className="flex gap-2">
                {screening.passed ? (
                  <button className="btn" onClick={proceedAfterScreening}>
                    Confirmar envío en testnet
                  </button>
                ) : (
                  <button className="btn" onClick={reset}>
                    Reiniciar con otros datos
                  </button>
                )}
                <button className="btn-ghost" onClick={reset}>
                  Volver
                </button>
              </div>
            </section>
          )}

          {(phase === "enviando" || phase === "listo") && transfer && (
            <section className="card space-y-5">
              <h2 className="text-xl font-semibold">
                Estado de la transferencia
              </h2>
              <p className="text-sm text-slate-400">
                ID {transfer.id} · {formatClp(transfer.amountClp)}
              </p>
              <ol className="space-y-3">
                {TRANSFER_STEPS.map((step) => {
                  const state = stepState(step.id, transfer.status);
                  return (
                    <li
                      key={step.id}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span
                        className={
                          "flex h-6 w-6 items-center justify-center rounded-full border text-xs " +
                          (state === "done"
                            ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
                            : state === "active"
                              ? "border-brand-500 bg-brand-500/20 text-brand-100"
                              : "border-white/15 text-slate-500")
                        }
                      >
                        {state === "done" ? "✓" : state === "active" ? "•" : ""}
                      </span>
                      <span
                        className={
                          state === "pending"
                            ? "text-slate-500"
                            : "text-slate-200"
                        }
                      >
                        {step.label}
                      </span>
                    </li>
                  );
                })}
              </ol>

              {transfer.txHash && (
                <p className="break-all rounded-lg border border-white/10 bg-slate-950/50 p-3 text-xs text-slate-400">
                  Hash demo (testnet): {transfer.txHash}
                </p>
              )}

              {phase === "listo" && (
                <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm">
                  <p className="font-semibold text-emerald-300">
                    Entrega simulada completada
                  </p>
                  <p className="mt-1 text-slate-300">
                    {recipientName} recibiría{" "}
                    {formatLocal(quote.amountLocal, corridor.currencyCode)} vía{" "}
                    {method.label}.
                  </p>
                </div>
              )}

              <button className="btn-ghost" onClick={reset}>
                Hacer otra transferencia
              </button>
            </section>
          )}
        </div>

        <aside className="card h-fit space-y-4">
          <h2 className="text-lg font-semibold">Cotización</h2>
          <div className="space-y-2 text-sm">
            <Row label="Envías" value={formatClp(quote.amountClp)} />
            <Row label="Comisión app" value={formatClp(quote.appFeeClp)} />
            <Row
              label={`Off-ramp (${method.label})`}
              value={formatClp(quote.offRampFeeClp)}
            />
            <Row label="Red (USDC)" value={formatClp(quote.networkFeeClp)} />
            <div className="my-2 border-t border-white/10" />
            <Row
              label="Costo total"
              value={`${formatClp(quote.totalFeeClp)} (${formatPct(
                quote.totalCostPct
              )})`}
              strong
            />
            <Row label="Llega a destino" value={formatUsd(quote.amountUsd)} />
            <Row
              label={`En ${corridor.currency}`}
              value={formatLocal(quote.amountLocal, corridor.currencyCode)}
              strong
            />
            <Row label="Tiempo estimado" value={quote.speed} />
          </div>

          <div className="rounded-lg border border-brand-500/30 bg-brand-500/10 p-3 text-xs text-slate-200">
            Ahorro estimado vs. banca tradicional (
            {(quote.bankCostPct * 100).toFixed(0)}%):{" "}
            <strong>{formatClp(quote.savingsClp)}</strong>
          </div>

          <p className="text-xs text-slate-500">
            Tasas y comisiones ficticias para la demo. CLP/USD fijo en 950.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-400">{label}</span>
      <span className={strong ? "font-semibold text-white" : "text-slate-200"}>
        {value}
      </span>
    </div>
  );
}

function stepState(
  step: TransferStatus,
  current: TransferStatus
): "done" | "active" | "pending" {
  const order = TRANSFER_STEPS.map((s) => s.id);
  const stepIndex = order.indexOf(step);
  const currentIndex = order.indexOf(current);
  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "active";
  return "pending";
}
