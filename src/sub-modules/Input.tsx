import React, { useState } from "react";
import { sendMoney } from "../transaction-modules/walletConn";


const Input: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : 0);
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value ? e.target.value.toString() : "");
  };

  const onClickSendMoney = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await sendMoney(address, amount);
  };

  

  return (
    <form className="input-form">
      <div className="send-inputs">
        <div className="amount-label">
          <label htmlFor="amount">Amount (lamports)</label>
        </div>
        <div className="address-label">
          <label htmlFor="address">Address</label>
        </div>
        <div className="input-amount">
          <input type="text" value={amount} onChange={onChangeAmount} />
        </div>
        <div className="input-address">
          <input type="text" value={address} onChange={onChangeAddress} />
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
