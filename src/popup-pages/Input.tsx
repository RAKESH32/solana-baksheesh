import React, { useState } from "react";
import { sendMoney,sendMessage } from "./walletConn";
import { Connection } from "@solana/web3.js";
import { WalletAdapter } from "./walletConn";
import { getChatMessageAccountPubkey } from "./account";
import { wallet,connection } from "./program";

var sentAdd = "Not initialzied/Found";

 const Input: React.FC = () => {

const [amount, setAmount] = useState(0);
const [address, setAddress] = useState("");
const [senderChatAdd, setSenderChatAdd] = useState("");
const [receiverChatAdd, setreceiverChatAdd] = useState("");
const [message, setmessage] = useState("");

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : 0);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value ? e.target.value.toString() : "");
  };

  const onChangeDestAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setreceiverChatAdd(e.target.value ? e.target.value.toString() : "");
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmessage(e.target.value ? e.target.value.toString() : "");
  };


  const onClickSendMoney = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
   // await sendMessage(senderChatAdd,receiverChatAdd,message);
    e.preventDefault();
    var Chataddress="9e1xLA5vyagZ66v1tzFXyW6UfvvTLpWPy2Gy74fACn8c";

    await sendMoney(address, amount);
    await sendMessage(Chataddress,message);

  };

  

  

  return (
    <form className="input-form">
      <div className="send-inputs">
         
      <div className="input-address">
          <input className="input-id" type="text" value={address}  placeholder="Destination Address" onChange={onChangeAddress} />
        </div>
        <div className="receiver_chat_add">
          <input type="text" value={receiverChatAdd}  placeholder="Destination Chat Address" onChange={onChangeDestAddress} />
        </div>
         <div className="message">
          <input type="text" value={message} placeholder="Message" onChange={onChangeMessage} />
        </div>
        <div className="input-amount">
          <input type="text" value={amount}  placeholder="Amount(SOL)" onChange={onChangeAmount} />
        </div>
       <div className="input-send">
          <button className="send-buttons" onClick={onClickSendMoney}>
            Submit
          </button>
        </div>
        
      </div>
    </form>
  );
};

export default Input;
