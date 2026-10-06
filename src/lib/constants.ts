import { PublicKey } from "@solana/web3.js";

// Solana RPC endpoint (mainnet-beta for production, devnet for testing)
export const SOLANA_RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet";

type TokenConfig = { mint: PublicKey; decimals: number; name: string; symbol: string };

// Mainnet token mint addresses
const MAINNET_TOKEN_MINTS: Record<string, TokenConfig> = {
  EURC: {
    mint: new PublicKey("HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzKKUCv7BcDFgGk"),
    decimals: 6,
    name: "Euro Coin",
    symbol: "EURC",
  },
  USDC: {
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
  },
};

// Devnet token mint addresses
// USDC: Circle's official devnet USDC mint
// EURC: Circle does not deploy EURC to devnet — using devnet USDC as a stand-in
//       so the demo payment flow works end-to-end with faucet tokens
const DEVNET_TOKEN_MINTS: Record<string, TokenConfig> = {
  EURC: {
    mint: new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),
    decimals: 6,
    name: "Euro Coin (devnet)",
    symbol: "EURC",
  },
  USDC: {
    mint: new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),
    decimals: 6,
    name: "USD Coin (devnet)",
    symbol: "USDC",
  },
};

// Select mints based on active network
export const TOKEN_MINTS: Record<string, TokenConfig> =
  SOLANA_NETWORK === "mainnet-beta" ? MAINNET_TOKEN_MINTS : DEVNET_TOKEN_MINTS;

// Supported currencies for display
export const SUPPORTED_CURRENCIES = [
  { value: "EURC", label: "EURC (Euro Coin)", icon: "🇪🇺" },
  { value: "USDC", label: "USDC (USD Coin)", icon: "🇺🇸" },
];

// App metadata
export const APP_NAME = "EUPay";
export const APP_DESCRIPTION = "Stablecoin payment links with automatic invoices for EU freelancers on Solana";
