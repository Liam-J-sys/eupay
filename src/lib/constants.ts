import { PublicKey } from "@solana/web3.js";

// Solana RPC endpoint (mainnet-beta for production, devnet for testing)
export const SOLANA_RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com";

export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet";

// Euro stablecoin mint addresses on Solana mainnet
export const TOKEN_MINTS: Record<string, { mint: PublicKey; decimals: number; name: string; symbol: string }> = {
  EURC: {
    mint: new PublicKey("HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzKKUCv7BcDFgGk"), // EURC on Solana mainnet
    decimals: 6,
    name: "Euro Coin",
    symbol: "EURC",
  },
  USDC: {
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // USDC on Solana mainnet
    decimals: 6,
    name: "USD Coin",
    symbol: "USDC",
  },
};

// Supported currencies for display
export const SUPPORTED_CURRENCIES = [
  { value: "EURC", label: "EURC (Euro Coin)", icon: "🇪🇺" },
  { value: "USDC", label: "USDC (USD Coin)", icon: "🇺🇸" },
];

// App metadata
export const APP_NAME = "EUPay";
export const APP_DESCRIPTION = "MiCA-compliant stablecoin payment links for EU freelancers on Solana";
