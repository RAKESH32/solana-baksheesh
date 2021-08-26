import Wallet from '@project-serum/sol-wallet-adapter';
import React,{FC} from 'react';
import {render} from 'react-dom';
import Input from './Input';
import {initWallet} from './walletConn';
import "./style.css";

interface IProps{

}
 
export const Popup: FC<IProps> = () => {

    const accountValidate = () => {
        initWallet();
      };
    

    return (
      <div className="wrapper">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <input type="radio" name="slider" id="transaction" checked />
      <input type="radio" name="slider" id="message" />
      <input type="radio" name="slider" id="about" />
      <header>Sol-Buck</header>
      <div>
      <nav>
      <label htmlFor="transaction" className="transaction"><i className="fa fa-bank"></i></label>
       <label htmlFor="message" className="message"><i className="fa fa-comment"></i></label>
       <label htmlFor="about" className="about"><i className="fa fa-info-circle"></i></label>
        <div className="slider"></div>
     </nav>
     </div>
     <section>
       <div className="content content-1">
       <div className="send-button-xtream">
          <button className="validate-buttons" onClick={accountValidate}>
            Validate Wallet
          </button>
        </div>
       <div className="App">
          <div className="App-body">
            <h3>Send Money !!</h3>
            <Input />
          
          </div>
        </div>
       </div>
       <div className="content content-2">
         <div className="inside_box">
           <p>Message Page</p>
         </div>
       </div>
       <div className="content content-3">
         <div className="inside_box">
           <p>About Page</p>
         </div>
       </div>
     </section>

     <div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
 
    </div>

    
      );
}

render(<Popup />, document.getElementById("popup"));