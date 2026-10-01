export type TransferStatus =
  | "borrador"
  | "cotizada"
  | "kyc_pendiente"
  | "screening"
  | "fondos_confirmados"
  | "enviada"
  | "entregada";

export const TRANSFER_STEPS: { id: TransferStatus; label: string }[] = [
  { id: "cotizada", label: "Cotización" },
  { id: "kyc_pendiente", label: "Verificación de identidad (KYC)" },
  { id: "screening", label: "Screening de sanciones (OFAC/SDN)" },
  { id: "fondos_confirmados", label: "Fondos confirmados" },
  { id: "enviada", label: "Envío en red (USDC · Sepolia)" },
  { id: "entregada", label: "Entregado en destino" },
];

export type Transfer = {
  id: string;
  createdAt: string;
  corridorId: string;
  methodId: string;
  amountClp: number;
  recipientName: string;
  recipientAccount: string;
  status: TransferStatus;
  /** Populated once the demo "sends" on the testnet. */
  txHash?: string;
};

export function createTransferId(): string {
  return `COR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

/** Deterministic fake hash so the demo looks real without touching a network. */
export function fakeTxHash(): string {
  const hex = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 64; i += 1) {
    out += hex[Math.floor(Math.random() * hex.length)];
  }
  return out;
}
