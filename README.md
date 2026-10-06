# EUPay — Stablecoin Payment Links for EU Freelancers

**MiCA-compliant payment links on Solana.** Create a link, share it with your client, get paid in EURC or USDC. Instant settlement, on-chain verification, auto-generated invoices.

Built for the [Colosseum Crypto World's Fair Hackathon](https://www.colosseum.org/) — Superteam Netherlands Track.

## The Problem

EU freelancers face 3-5 day bank transfers, 3-8% cross-border fees, and — since MiCA took effect in July 2026 — no simple way to accept regulated stablecoin payments with proper invoicing.

## The Solution

EUPay is the simplest way for EU freelancers to get paid in stablecoins:

1. **Create** a payment link (amount, currency, service description)
2. **Share** the link with your client
3. **Get paid** — client scans the QR code or clicks to pay from any Solana wallet
4. **Invoice** — auto-generated MiCA-compliant PDF with on-chain verification

No smart contracts. No wallet connection required for the freelancer to create links. Just standard SPL token transfers via Solana Pay.

## Supported Currencies

- 🇪🇺 **EURC** (Euro Coin) — MiCA-regulated euro stablecoin by Circle
- 🇺🇸 **USDC** (USD Coin) — for international clients

## Tech Stack

- **Next.js** — React framework
- **Solana Pay** — payment URL and QR code generation
- **@solana/web3.js** — blockchain interaction and payment detection
- **jsPDF** — invoice PDF generation
- **Tailwind CSS** — styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage — create payment link form
│   ├── pay/[id]/page.tsx     # Payment page — QR code, pay button, status
│   └── dashboard/page.tsx    # Dashboard — track all payment links
├── components/
│   ├── CreatePaymentForm.tsx # Payment link creation form
│   ├── PaymentPage.tsx       # Payment page with QR, polling, invoice
│   ├── Dashboard.tsx         # Payment links list and stats
│   └── Header.tsx            # Navigation header
└── lib/
    ├── constants.ts          # Token mints, RPC config
    ├── solana.ts             # Solana Pay URLs, payment detection
    ├── invoice.ts            # MiCA-compliant PDF invoice generation
    ├── storage.ts            # localStorage-based storage (MVP)
    └── types.ts              # TypeScript types
```

## Why Solana

- Sub-second finality
- < $0.01 transaction fees
- Native EURC and USDC support
- Solana Pay standard for payment URLs

## Why Now

- MiCA fully enforced across EU (July 2026)
- Netherlands was the first EU country to enforce MiCA (July 2025)
- $835M euro stablecoin market, Solana holds 14.8%
- No existing tool combines payment links + EU-compliant invoicing for freelancers

## Team

Built for the Superteam Netherlands track by a UK-based market researcher and a Netherlands-based collaborator.

## License

MIT
