import {
  Connection,
  PublicKey,
  TransactionSignature,
} from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { SOLANA_RPC_URL, TOKEN_MINTS } from "./constants";

const connection = new Connection(SOLANA_RPC_URL, "confirmed");

export function getConnection(): Connection {
  return connection;
}

/**
 * Build a Solana Pay transfer URL for SPL token payment
 */
export function buildSolanaPayUrl(params: {
  recipient: string;
  amount: number;
  currency: "EURC" | "USDC";
  label?: string;
  message?: string;
  memo?: string;
}): string {
  const { recipient, amount, currency, label, message, memo } = params;
  const token = TOKEN_MINTS[currency];

  // Solana Pay URL format: solana:<recipient>?amount=<amount>&spl-token=<mint>&label=<label>&message=<message>&memo=<memo>
  const url = new URL(`solana:${recipient}`);
  url.searchParams.set("amount", amount.toString());
  url.searchParams.set("spl-token", token.mint.toBase58());

  if (label) url.searchParams.set("label", label);
  if (message) url.searchParams.set("message", message);
  if (memo) url.searchParams.set("memo", memo);

  return url.toString();
}

/**
 * Get the token balance of a wallet for a specific currency
 */
export async function getTokenBalance(
  walletAddress: string,
  currency: "EURC" | "USDC"
): Promise<number> {
  try {
    const token = TOKEN_MINTS[currency];
    const wallet = new PublicKey(walletAddress);
    const ata = await getAssociatedTokenAddress(token.mint, wallet);
    const account = await getAccount(connection, ata);
    return Number(account.amount) / Math.pow(10, token.decimals);
  } catch {
    return 0;
  }
}

/**
 * Poll for incoming token transfers to a wallet.
 * Returns the transaction signature if a new transfer is detected.
 */
export async function checkForPayment(
  recipientWallet: string,
  currency: "EURC" | "USDC",
  expectedAmount: number,
  afterSignature?: string
): Promise<{ found: boolean; signature?: string; amount?: number }> {
  try {
    const token = TOKEN_MINTS[currency];
    const wallet = new PublicKey(recipientWallet);
    const ata = await getAssociatedTokenAddress(token.mint, wallet);

    // Get recent transaction signatures for the ATA
    const signatures = await connection.getSignaturesForAddress(ata, {
      limit: 5,
      until: afterSignature,
    });

    if (signatures.length === 0) {
      return { found: false };
    }

    // Check the most recent transactions
    for (const sigInfo of signatures) {
      if (sigInfo.err) continue;

      const tx = await connection.getParsedTransaction(sigInfo.signature, {
        maxSupportedTransactionVersion: 0,
      });

      if (!tx?.meta) continue;

      // Look for token transfer instructions
      const instructions = tx.transaction.message.instructions;
      for (const ix of instructions) {
        if ("parsed" in ix && ix.parsed?.type === "transferChecked") {
          const info = ix.parsed.info;
          if (
            info.mint === token.mint.toBase58() &&
            info.destination === ata.toBase58()
          ) {
            const transferredAmount =
              Number(info.tokenAmount.amount) /
              Math.pow(10, info.tokenAmount.decimals);

            if (Math.abs(transferredAmount - expectedAmount) < 0.01) {
              return {
                found: true,
                signature: sigInfo.signature,
                amount: transferredAmount,
              };
            }
          }
        }
      }
    }

    return { found: false };
  } catch (error) {
    console.error("Error checking for payment:", error);
    return { found: false };
  }
}

/**
 * Validate a Solana wallet address
 */
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get a transaction's explorer URL
 */
export function getExplorerUrl(
  signature: TransactionSignature,
  network: string = "devnet"
): string {
  const cluster = network === "mainnet-beta" ? "" : `?cluster=${network}`;
  return `https://explorer.solana.com/tx/${signature}${cluster}`;
}
