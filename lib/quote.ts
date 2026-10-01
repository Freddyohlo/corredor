import { CLP_PER_USD, type Corridor, type DeliveryMethod } from "./corridors";

export type Quote = {
  amountClp: number;
  amountUsd: number;
  amountLocal: number;
  appFeeClp: number;
  offRampFeeClp: number;
  networkFeeClp: number;
  totalFeeClp: number;
  /** Total cost as a fraction of the amount sent (the number users actually feel). */
  totalCostPct: number;
  receivedPct: number;
  speed: string;
  /** Illustrative bank benchmark for the same corridor. */
  bankCostPct: number;
  savingsClp: number;
};

/** Our platform fee. */
export const APP_FEE = 0.015;
/** Stablecoin network cost, in USD. Negligible on modern rails. */
const NETWORK_FEE_USD = 0.01;
/** World Bank estimate: remittances to Latin America can exceed 7% in total cost. */
export const BANK_BENCHMARK_PCT = 0.07;

export function buildQuote(
  amountClp: number,
  corridor: Corridor,
  method: DeliveryMethod
): Quote {
  const safeAmount = Number.isFinite(amountClp) && amountClp > 0 ? amountClp : 0;

  const appFeeClp = safeAmount * APP_FEE;
  const offRampFeeClp = safeAmount * method.offRampFee;
  const networkFeeClp = NETWORK_FEE_USD * CLP_PER_USD;
  const totalFeeClp = appFeeClp + offRampFeeClp + networkFeeClp;

  const netClp = Math.max(safeAmount - totalFeeClp, 0);
  const amountUsd = netClp / CLP_PER_USD;
  const amountLocal = amountUsd * corridor.localPerUsd;

  const totalCostPct = safeAmount > 0 ? totalFeeClp / safeAmount : 0;
  const bankFeeClp = safeAmount * BANK_BENCHMARK_PCT;

  return {
    amountClp: safeAmount,
    amountUsd,
    amountLocal,
    appFeeClp,
    offRampFeeClp,
    networkFeeClp,
    totalFeeClp,
    totalCostPct,
    receivedPct: 1 - totalCostPct,
    speed: method.speed,
    bankCostPct: BANK_BENCHMARK_PCT,
    savingsClp: Math.max(bankFeeClp - totalFeeClp, 0),
  };
}

export function formatClp(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatLocal(value: number, currencyCode: string): string {
  return `${new Intl.NumberFormat("es-CL", {
    maximumFractionDigits: 2,
  }).format(value)} ${currencyCode}`;
}

export function formatPct(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}
