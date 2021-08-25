import { PublicKey,Connection } from "@solana/web3.js";
import { WalletAdapter } from "./walletConn";
import Wallet from "@project-serum/sol-wallet-adapter";

export const programId = new PublicKey(
  "FfeVc9gJzPt9ugRVCVdg2aMpHDrgRKP15ZHUCELjY8nQ"
);

export const cluster = "https://api.devnet.solana.com";
export const connection = new Connection(cluster, "confirmed");
export const wallet: WalletAdapter = new Wallet("https://www.sollet.io", cluster);
