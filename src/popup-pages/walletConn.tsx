
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import EventEmitter from "eventemitter3";
import Wallet from "@project-serum/sol-wallet-adapter";
import { programId } from "./program";
import * as borsh from 'borsh';
(window as any).global = window;
// @ts-ignore
window.Buffer = window.Buffer || require('buffer').Buffer;

class GreetingAccount {
  txt:string ='';
  constructor(fields: {txt: string} | undefined = undefined) {
    if (fields) {
      this.txt = fields.txt;
    }
  }
}

 const cluster = "https://api.devnet.solana.com";
 const connection = new Connection(cluster, "confirmed");
 const wallet: WalletAdapter = new Wallet("https://www.sollet.io", cluster);
 var sentAdd = "Not Initialzed";
 let walletPublicKey:string;

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
  disconnect: () => any;
}
 
export async function updateWalletPK(walletPk : PublicKey)
{
  walletPublicKey = walletPk.toBase58();
}



export async function initWallet() {

  await wallet.connect();
  console.log("wallet publicKey", wallet?.publicKey?.toBase58());

  //to initialize sender chat address
if (wallet.publicKey) {
  getChatMessageAccountPubkey(
    connection,
    wallet,
    20 //size of  account
  ).then((walletChatPubkey) => {
    sentAdd = walletChatPubkey.toBase58();
    //logic for showing message needs implementation
 //   getMessagesInternal(connection, walletChatPubkey.toBase58());
  });
}


updateWalletPK (wallet!.publicKey!);

return [connection, wallet];
  
}

export async function getChatMessageAccountPubkey(
  connection: Connection,
  wallet: WalletAdapter,
  space: number,
  reset: boolean = false
): Promise<PublicKey> {

  if (!wallet.publicKey) {
      throw Error("Wallet has no PublicKey");
    }

    let chatAccountPubkey: PublicKey | null = null;

    if (!reset) {
      const existingPubkeyStr = localStorage.getItem(
        wallet.publicKey.toBase58() ?? ""
      );
      if (existingPubkeyStr) {
        chatAccountPubkey = new PublicKey(existingPubkeyStr);
        console.log("chat account found");
        return chatAccountPubkey;
      }
    }
    console.log("start creating new chat account");
    const CHAT_SEED = "chat" + Math.random().toString();
    chatAccountPubkey = await PublicKey.createWithSeed(
    wallet.publicKey,
    CHAT_SEED,
    programId);
    console.log("new chat account pubkey", chatAccountPubkey.toBase58());
    const lamports = await connection.getMinimumBalanceForRentExemption(space);
    const instruction = SystemProgram.createAccountWithSeed({
      fromPubkey: wallet.publicKey,
      basePubkey: wallet.publicKey,
      seed: CHAT_SEED,
      newAccountPubkey: chatAccountPubkey,
      lamports,
      space,
      programId,
    });
    let trans = await setWalletTransaction(instruction);
    
console.log("setPayerAndBlockhashTransaction", trans);
let signature = await signAndSendTransaction(wallet, trans);
console.log("signAndSendTransaction", signature);
let result = await connection.confirmTransaction(signature, "singleGossip");
console.log("new chat account created", result);
localStorage.setItem(
  wallet.publicKey.toBase58(),
  chatAccountPubkey.toBase58()
);
return chatAccountPubkey;
    

}

export async function sendMoney(
  destPubkeyStr: string,
  lamports: number = 500 * 1000000
) {
  try {
    console.log("starting sendMoney");
    const destPubkey = new PublicKey(destPubkeyStr);
    const walletAccountInfo = await connection.getAccountInfo(
      new PublicKey(walletPublicKey)
    );
    console.log("wallet data size", walletAccountInfo?.data.length);

    const receiverAccountInfo = await connection.getAccountInfo(destPubkey);
    console.log("receiver data size", receiverAccountInfo?.data.length);

    const instruction = SystemProgram.transfer({
      fromPubkey: new PublicKey(walletPublicKey),
      toPubkey: destPubkey,
      lamports, // about half a SOL
    });
    let trans = await setWalletTransaction(instruction);

    let signature = await signAndSendTransaction(wallet, trans);
    let result = await connection.confirmTransaction(signature, "singleGossip");
    console.log("money sent", result);
  } catch (e) {
    console.warn("Transaction Failed", e);
  }
}

const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['txt', 'string']]}],
]);

export async function sendMessage(
  destPubkeyStr: string,
  msg: string,
) {
  try {
    console.log('Sending Message to', destPubkeyStr);
    let messageAccount = new GreetingAccount();
    messageAccount.txt = msg;
    const destPubKey = new PublicKey(destPubkeyStr);
    const instruction = new TransactionInstruction({
      keys: [{pubkey: destPubKey, isSigner: false, isWritable: true}],
      programId,
      data: Buffer.from(borsh.serialize(GreetingSchema,messageAccount)),
    });
    let trans = await setWalletTransaction(instruction);

    let signature = await signAndSendTransaction(wallet, trans);
    let result = await connection.confirmTransaction(signature, "singleGossip");
    console.log("message sent", result);

  } catch (e) {
    console.warn("Message Failed", e);
  }
}

export async function setWalletTransaction(
  instruction: TransactionInstruction
): Promise<Transaction> {
  const transaction = new Transaction();
  transaction.add(instruction);
  transaction.feePayer = new PublicKey(walletPublicKey);
  let hash = await connection.getRecentBlockhash();
  console.log("blockhash", hash);
  transaction.recentBlockhash = hash.blockhash;
  return transaction;
}

export async function signAndSendTransaction(
  wallet: WalletAdapter,
  transaction: Transaction
): Promise<string> {
  let signedTrans = await wallet.signTransaction(transaction);
  console.log("sign transaction");
  let signature = await connection.sendRawTransaction(signedTrans.serialize());
  console.log("send raw transaction");
  return signature;
}


