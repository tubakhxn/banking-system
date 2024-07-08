import React from "react";

function TransferMoneyConfirmation(props) {
    const {MoneyFromTransfer,MoneyToTransfer,AmountToTransfer,HandleTransfer} = props
    return (
        <div className="container text-white mt-5">
            <h5>Are you sure you want to transfer money:</h5>
            <div className="container mt-5">
                <h5>From: </h5>
                <div className="ms-5 row">
                    <span>ID: {MoneyFromTransfer.CustomerID}</span>
                    <span>Name: {MoneyFromTransfer.Name}</span>
                </div>
                <h5>To:  </h5>
                <div className="ms-5 row">
                    <span>ID: {MoneyToTransfer.CustomerID}</span>
                    <span>Name: {MoneyToTransfer.Name} </span>
                </div>
                <h5 className="mt-5">Amount to Transfer: {AmountToTransfer}  </h5>
            </div>
            <div className="container mt-5">
                <button className="btn text-white bg-success m-4" onClick={HandleTransfer}>
                    Yes, Transfer the Amount
                </button>
                <a href="/">
                    <button className="btn btn-outline-danger">No, Cancel</button>
                </a>
            </div>
        </div>
    );
}

export default TransferMoneyConfirmation;
