import React from 'react';
import './App.css';
import Input from './popup-pages/Input';
import { initWallet } from './popup-pages/walletConn';

function App() {

  const accountValidate = () => {
    initWallet();
  };


  return (
    <div className="App">
      <div className="App-body">
        <h3>Send Money !!</h3>
        <Input />
        <button className="send-buttons" onClick={accountValidate}>
            Validate Wallet
          </button>
      </div>
    </div>
  );
}

export default App;
