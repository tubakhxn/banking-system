import React, { useState } from "react";

export default function MoneyFromTransferDetail(props) {
    const { MoneyFromTransfer, onTransferBtnClick, TransferAmount } = props;
    const [amount, setAmount] = useState("");

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        TransferAmount(amount); // Call the parent function to transfer the amount
    };
    

    return (
        <>
            <div className="container w-75 d-flex text-white-50 mt-5 m-auto row ">
                <h2 className="text-center mb-5 text-danger">MoneyFromTransfer Details</h2>
                <div className="col me-5 text-left">
                    <h4>Name: {MoneyFromTransfer.Name}</h4>
                    <h4>Email: {MoneyFromTransfer.Email}</h4>
                    <h4>Phone: {MoneyFromTransfer.Phone}</h4>
                    <h4>Address: {MoneyFromTransfer.Address}</h4>
                </div>
                <div className="col ms-4">
                    <h4>MoneyFromTransfer ID: {MoneyFromTransfer.MoneyFromTransferID}</h4>
                    <h4>Account Balance : {MoneyFromTransfer.AccountBalance}</h4>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="input-group"
                            type="number"
                            placeholder="Enter Amount to Transfer"
                            value={amount}
                            onChange={handleAmountChange}
                            required
                        />
                        <button className="btn bg-success px-5 py-2 fs-6 mt-4 text-white" type="submit" onClick={() => onTransferBtnClick()}> Transfer Money</button>
                    </form>
                </div>
            </div>
        </>
    );
}
