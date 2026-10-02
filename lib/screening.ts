export type ScreeningResult = {
  /** Whether the counterparty passed the demo sanctions screen. */
  passed: boolean;
  riskScore: number;
  reasons: string[];
};

/**
 * DEMO screening. Not a real sanctions check.
 *
 * The names below stand in for the kind of list hit that a real compliance
 * program must catch: an SDN match must be blocked and reported to OFAC
 * within 10 business days. This simulates that gate so the flow is visible.
 */
const DEMO_BLOCKLIST = ["test sancionado", "prueba sdn", "blocked demo"];

export function screenCounterparty(
  name: string,
  corridorSanctionsNote: string
): ScreeningResult {
  const normalized = name.trim().toLowerCase();
  const reasons: string[] = [];

  const hit = DEMO_BLOCKLIST.some((entry) => normalized.includes(entry));
  if (hit) {
    reasons.push("Coincidencia en lista de demostración (simula un hit SDN).");
  }
  if (normalized.length < 3) {
    reasons.push("Nombre del destinatario incompleto: no se puede verificar.");
  }

  const passed = reasons.length === 0;

  // High-risk corridors carry a heavier baseline score, which is why they
  // require enhanced due diligence rather than a simple name check.
  const baseScore = corridorSanctionsNote.includes("OFAC") ? 45 : 30;
  const riskScore = passed ? baseScore : 90;

  if (passed && baseScore >= 45) {
    reasons.push("Corredor de alto riesgo: requiere debida diligencia reforzada.");
  }

  return { passed, riskScore, reasons };
}
