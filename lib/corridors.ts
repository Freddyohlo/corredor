export type CorridorId = "ve" | "ht";

export type DeliveryMethod = {
  id: string;
  label: string;
  /** Fee charged by the local off-ramp partner, as a fraction of the amount. */
  offRampFee: number;
  /** Typical settlement time, in human terms. */
  speed: string;
};

export type Corridor = {
  id: CorridorId;
  country: string;
  flag: string;
  currency: string;
  currencyCode: string;
  /** Demo mid-market rate: how many units of local currency per 1 USD. */
  localPerUsd: number;
  /** Sanctions profile, shown to the user for transparency. */
  sanctionsNote: string;
  methods: DeliveryMethod[];
};

/**
 * DEMO DATA ONLY.
 * Rates are illustrative placeholders for a testnet prototype, not live quotes.
 */
export const CLP_PER_USD = 950;

export const CORRIDORS: Record<CorridorId, Corridor> = {
  ve: {
    id: "ve",
    country: "Venezuela",
    flag: "🇻🇪",
    currency: "Bolívar",
    currencyCode: "VES",
    localPerUsd: 36.5,
    sanctionsNote:
      "Corredor con programa de sanciones OFAC (VSR). Requiere screening SDN estricto.",
    methods: [
      { id: "pago-movil", label: "Pago Móvil", offRampFee: 0.01, speed: "minutos" },
      { id: "cuenta", label: "Cuenta bancaria", offRampFee: 0.012, speed: "1–24 h" },
      { id: "p2p", label: "Binance P2P (USDT)", offRampFee: 0.005, speed: "minutos" },
    ],
  },
  ht: {
    id: "ht",
    country: "Haití",
    flag: "🇭🇹",
    currency: "Gourde",
    currencyCode: "HTG",
    localPerUsd: 132,
    sanctionsNote:
      "Sanciones OFAC basadas en listas (targeted). Riesgo AML alto por control territorial.",
    methods: [
      { id: "moncash", label: "MonCash", offRampFee: 0.015, speed: "minutos" },
      { id: "unibank", label: "Unibank", offRampFee: 0.012, speed: "1–24 h" },
      { id: "efectivo", label: "Retiro en efectivo", offRampFee: 0.02, speed: "mismo día" },
    ],
  },
};

export const CORRIDOR_LIST = Object.values(CORRIDORS);
