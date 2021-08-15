// @ts-ignore
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection,PublicKey,Transaction } from '@solana/web3.js';
import EventEmitter from 'eventemitter3';


export interface WalletAdapter extends EventEmitter {
    publicKey: PublicKey | null;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    connect: () => any;
    disconnect: () => any;
  }

const website = "http://devnet.solana.com";
const conn= new Connection (website,'confirmed');
const wallet: WalletAdapter = new Wallet("http://www.sollet.io",website);