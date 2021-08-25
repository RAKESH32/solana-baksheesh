import Wallet from '@project-serum/sol-wallet-adapter';
import React,{FC} from 'react';
import {render} from 'react-dom';
import Input from './Input';
import {initWallet} from './walletConn';

interface IProps{

}
 
export const Popup: FC<IProps> = () => {

    const accountValidate = () => {
        initWallet();
      };
    

    return (
        <div className="App">
          <div className="App-body">
            <h3>Send Money !!</h3>
            <Input />
            <button className="send-buttons" onClick={accountValidate}>
                Validate Sollet Wallet
              </button>
          </div>
        </div>
      );
}

render(<Popup />, document.getElementById("popup"));