import Link from "next/link";

export const metadata = {
  title: "Cumplimiento · Corredor",
};

const SECTIONS = [
  {
    title: "Qué es esta demo (y qué no es)",
    items: [
      "Es un prototipo no-custodial en testnet con datos y tasas ficticias.",
      "No custodia fondos de terceros, no mueve dinero real y no es un servicio financiero.",
      "Existe como pieza de portafolio y como demostración de dominio del corredor y sus controles.",
    ],
  },
  {
    title: "Por qué no custodiamos fondos",
    items: [
      "En Chile, la Ley Fintech 21.521 exige inscripción en el registro de la CMF y autorización previa para servicios que transmiten o custodian fondos.",
      "Un modelo no-custodial queda fuera de ese perímetro; uno custodial exige patrimonio y garantías que van desde UF 1.000 a UF 5.000.",
      "La decisión de diseño es deliberada: demuestra entender la línea regulatoria, no esquivarla.",
    ],
  },
  {
    title: "Riesgo de sanciones en los corredores elegidos",
    items: [
      "Venezuela está sujeta al programa de sanciones OFAC (VSR). El alivio de 2026 es sectorial (petróleo, minerales), no una autorización general de remesas.",
      "Haití tiene sanciones OFAC basadas en listas, con riesgo AML alto por control territorial de pandillas.",
      "Por eso el flujo incluye screening SDN simulado y un gate explícito que bloquea coincidencias.",
    ],
  },
  {
    title: "Qué exigiría un servicio real",
    items: [
      "Programa AML/CFT completo: KYC, debida diligencia reforzada, monitoreo y reporte de operaciones sospechosas a la UAF.",
      "Screening SDN/OFAC continuo, con bloqueo y reporte dentro de 10 días hábiles ante un match.",
      "Proveedor de off-ramp licenciado en cada país de destino.",
      "Si se tocan rieles en USD: registro FinCEN MSB, licencias estatales y Travel Rule.",
    ],
  },
];

export default function CumplimientoPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <span className="badge">Cumplimiento</span>
        <h1 className="text-3xl font-bold">
          Diseñado entendiendo la regulación, no esquivándola
        </h1>
        <p className="max-w-3xl text-slate-300">
          Un servicio de remesas real cruza tres marcos: la Ley Fintech chilena,
          la normativa AML de la UAF y las sanciones internacionales de OFAC.
          Esta demo documenta los tres y simula los controles clave.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {SECTIONS.map((section) => (
          <section key={section.title} className="card space-y-3">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <ul className="space-y-2 text-sm text-slate-300">
              {section.items.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">Ruta de demo a negocio</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-slate-400">
              <tr>
                <th className="py-2 pr-4">Etapa</th>
                <th className="py-2 pr-4">Qué haces</th>
                <th className="py-2">Licencias</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr className="border-t border-white/10">
                <td className="py-2 pr-4 font-medium text-white">
                  1. Demo portafolio
                </td>
                <td className="py-2 pr-4">
                  No-custodial, testnet, sin dinero real
                </td>
                <td className="py-2">Ninguna</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-2 pr-4 font-medium text-white">
                  2. Piloto cerrado
                </td>
                <td className="py-2 pr-4">
                  Montos mínimos, con proveedor licenciado
                </td>
                <td className="py-2">Asesoría legal</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-2 pr-4 font-medium text-white">
                  3. Modelo partner
                </td>
                <td className="py-2 pr-4">
                  On/off-ramp y custodia de terceros ya licenciados
                </td>
                <td className="py-2">No licencias tú</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-2 pr-4 font-medium text-white">
                  4. Transmisor licenciado
                </td>
                <td className="py-2 pr-4">Operas tú la transmisión</td>
                <td className="py-2">CMF + FinCEN + estados</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-100">
        <p className="font-semibold">Aviso legal</p>
        <p className="mt-1">
          Este documento es informativo y educativo; no constituye asesoría
          legal. Antes de operar comercialmente o mover fondos de terceros se
          debe contratar asesoría especializada en fintech y sanciones, y validar
          con la CMF y la UAF.
        </p>
      </div>

      <Link href="/enviar" className="btn inline-block">
        Volver al flujo de envío
      </Link>
    </div>
  );
}
