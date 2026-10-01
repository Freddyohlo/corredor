# Corredor — Demo de remesas con stablecoins

Prototipo **no-custodial en testnet** para el corredor **Chile → Venezuela / Haití**.
Muestra el cotizador, el flujo de estados y los controles de cumplimiento que un
servicio real de remesas necesita.

> ⚠️ **Demo educativa.** No custodia fondos, no mueve dinero real y no es un
> servicio financiero. Tasas y comisiones son ficticias. Ver la página
> `/cumplimiento`.

## El problema

Los envíos a Latinoamérica pueden superar el **7% del monto** en costo total
(Banco Mundial), y la banca tradicional tarda hasta **72 horas hábiles**.
Los rieles de stablecoin liquidan en segundos por menos de US$0,01.

## Qué muestra la demo

- **Cotizador con costo total real:** no solo la comisión visible, también
  off-ramp y red, y cuánto llega a destino.
- **Flujo por estados:** cotización → KYC → screening → fondos → envío → entrega.
- **Screening de sanciones simulado:** con gate que bloquea coincidencias.
- **Página de cumplimiento:** Ley Fintech 21.521, AML/UAF y sanciones OFAC.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Sin dependencias Web3 en esta versión: el envío on-chain está simulado

## Cómo correr

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Estructura

```
app/
  page.tsx            Landing con corredores y propuesta de valor
  enviar/page.tsx     Flujo interactivo de transferencia
  cumplimiento/page.tsx  Marco regulatorio y aviso legal
lib/
  corridors.ts        Definición de corredores y métodos de entrega
  quote.ts            Motor de cotización (costo total real)
  screening.ts        Simulación de screening SDN
  transfer.ts         Máquina de estados de la transferencia
```

## Cumplimiento en una línea

En el momento en que se custodian o transmiten fondos de terceros, se deja de
ser "una app" y se pasa a ser una entidad financiera regulada (CMF en Chile,
FinCEN y estados en EE.UU., con screening OFAC obligatorio). Por eso esta
versión es **no-custodial y en testnet**.

## Roadmap

- [ ] Fase 2: envío real de USDC en Sepolia con wagmi/viem
- [ ] Fase 3: orquestador FastAPI + persistencia de transferencias
- [ ] Fase 4: integración con proveedor de screening real (sandbox)
- [ ] Fase 5: caso de estudio y video demo

---

Proyecto de portafolio de **Freddy Pérez** · [GitHub](https://github.com/Freddyohlo) · [Portafolio](https://landing-portafolio-fp.vercel.app/)
