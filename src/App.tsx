import React from 'react';
import './App.css';
import Input from './sub-modules/Input';
import { initWallet } from './transaction-modules/walletConn';

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
            Validate Account
          </button>
      </div>
    </div>
  );
}

export default App;
