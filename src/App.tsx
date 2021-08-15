import React,{useEffect} from 'react';
import './App.css';
import Input from './sub-modules/Input';
import { initWallet, WalletAdapter } from './transaction-modules/walletConn';
import {Connection} from "@solana/web3.js";

function App() {

  const conn = React.useRef<Connection>();
  const wall = React.useRef<WalletAdapter>();

  useEffect(() => {
    initWallet().then(([connection, wallet]: [Connection, WalletAdapter]) => {
      conn.current = connection;
      wall.current = wallet;
    });
  }, []);


  return (
    <div className="App">
      <div className="App-body">
        <h3>Send Money !!</h3>
        <Input />
      </div>
    </div>
  );
}

export default App;
