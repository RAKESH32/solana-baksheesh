import React, { useState } from "react";
import { sendMoney,sendMessage } from "./walletConn";

const Input: React.FC = () => {

const [amount, setAmount] = useState(0);
const [address, setAddress] = useState("");
const [receiverChatAdd, setreceiverChatAdd] = useState("");
const [inrVal, setInrVal] = useState(0);
const [tranStatus, setTranStatus] = useState("");
var [signalNum,setSignalNum] = useState(0);

var [message, setmessage] = useState("");

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : 0);
    setInrVal(e.target.value ? Number(e.target.value) * 6500 : 0);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value ? e.target.value.toString() : "");
  };

  const onChangeDestAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setreceiverChatAdd(e.target.value ? e.target.value.toString() : "");
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmessage(e.target.value ? e.target.value.toString() : "");
    setSignalNum(e.target.value.length);
   
  };


  const onClickSendMoney = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
   // await sendMessage(senderChatAdd,receiverChatAdd,message);
    e.preventDefault();
    setTranStatus("Transaction Status : Pending");
    var Chataddress="AoxScBzkQEco1PME8Mk8bLrRWN5hoD4GG9WMRib44xaP";
    await sendMoney(address, amount * 1000000000);

    if(message.length <40)
    {
      message = message + ':';
    }
  while (message.length < 40) {
        message = message + '0';
    }
    await sendMessage(Chataddress,message);

    setTranStatus("Transaction Status : Success");
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
         <div className="messageInput">
          {/* <input type="text" value={message} placeholder="Message" onChange={onChangeMessage} /> */}
          <input placeholder="Write your message" value={message} onChange={onChangeMessage}  required className="InputText"></input>
          <div className="characters">
              <span className="signal_num">{signalNum}</span>
              <span className="limit_num">/40</span>
          </div>
        </div>

       
       


        <div className="input-amount">
          {/* <input type="text" value={amount}  placeholder="Amount(SOL)" onChange={onChangeAmount} /> */}
          <input type="number" id="amount" name="amount" min="0.0625"  placeholder="Amount(SOL)"  onChange={onChangeAmount} ></input>
        </div>
        <div className="inr_value">
          <p>Value in INR : रू <span>{inrVal}</span></p>
        </div>
        <div className="transaction_status">
          <p><b>{tranStatus}</b></p>
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
