
// some essitainals things to import 
import "./App.css";
import Navbar from "./components/Navbar.js";
import IndexMain from "./components/IndexMain.js";
import { useState, useEffect } from "react";
import CustomerList from "./components/CustomerList.js";
import CustomerDetail from "./components/CustomerDetail.js";
import TransferMoneyConfirmation from "./components/TransferMoneyConfirmation.js";
import TransferConfirmedComponent from "./components/TransferConfirmedComponent.js"


// the main app function 
function App() {

  // State variables for managing various aspects of the application
  const [showListBtn, setshowListBtn] = useState(true);
  const [showList, setshowList] = useState(false);
  const [forTransfer, setforTransfer] = useState(false);
  const [TransferConfirmation, setTransferConfirmation] = useState(false);
  const [TransferConfirmed, setTransferConfirmed] = useState(false);
  const [TransferDeatailPage, setTransferDeatailPage] = useState(false)

  // State variables for transfer details
  const [MoneyFromTransfer, setMoneyFromTransfer] = useState(null);
  const [MoneyToTransfer, setMoneyToTransfer] = useState(null);
  const [AmountToTransfer, setAmountToTransfer] = useState(null);

  // State variable for getting data from database 
  const [CustomersDatabase, setCustomersDatabase] = useState(null)


  // function for showing hideing view Cutomer btn and show customer list 
  const view_customer_btn = () => {
    setshowList(true);
    setshowListBtn(false);
  }

  // Fetch data from the Django backend API when the component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/data/`)
    // fetch(`${process.env.REACT_APP_BACKEND_URL}/api/data/`, {

      .then(response => response.json())
      .then(data => {
        // Handle the fetched data
        setCustomersDatabase(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  // Function to handle customer clicks
  const handleCustomerClick = (customerId) => {
    // if statement for showing Customer detail from where transfer to occur
    if (forTransfer === false) {
      // Find the selected customer from the database
      const sender = CustomersDatabase.find(
        (customer) => customer.CustomerID === customerId
      );
      setMoneyFromTransfer(sender); // saves the data of senders
      setshowList(false); // hide the customer list
      setTransferDeatailPage(true)
    } 
    // else statement for transfer customer click
    else {
      // Set the target customer for transfer and initiate the transfer process
      const receiver = CustomersDatabase.find(
        (customer) => customer.CustomerID === customerId
      );
      setMoneyToTransfer(receiver); // saves the data of reciver
      setTransferConfirmation(true);  // shows the transfer confimation page 
      setshowList(false); // hides customer list 
    }
  };

  // Function to set the amount to transfer from customer details page
  const TransferAmount = (amount) => {
    setAmountToTransfer(amount);
    setTransferDeatailPage(false);


  };

  // Transfer btn function on customer details page
  const onTransferBtnClick = () => {
    setshowList(true); // shows the list of customer to select reciver
    setforTransfer(true); // sets fortransfer true 
  };  

  // Function to handle the trasfer and send data to backend
  const HandleTransfer = () => {
    // Convert AccountBalances to numbers
    const senderBalance = parseFloat(MoneyFromTransfer.AccountBalance);
    const receiverBalance = parseFloat(MoneyToTransfer.AccountBalance);
    const transferAmount = parseFloat(AmountToTransfer);
  
    // Check if conversion was successful
    if (!isNaN(senderBalance) && !isNaN(receiverBalance) && !isNaN(transferAmount)) {
      // Calculate updated balances
      const updatedSenderBalance = senderBalance - transferAmount;
      const updatedReceiverBalance = receiverBalance + transferAmount;
  
      // Prepare the data to send to the backend
      const transferData = {
        senderID: MoneyFromTransfer.CustomerID,
        receiverID: MoneyToTransfer.CustomerID,
        amount: transferAmount,
        senderBalance: updatedSenderBalance,
        receiverBalance: updatedReceiverBalance
      };
  
      // Send the transfer data to the backend
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/transfer/`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transferData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Reset transfer states if the transfer was successful
        setMoneyFromTransfer(null);
        setMoneyToTransfer(null);
        setAmountToTransfer(null);
        setTransferConfirmation(false);
        setTransferConfirmed(true);
      })
      .catch(error => {
        console.error('Error transferring data:', error);
      });
    } else {
      console.error("Invalid AccountBalance or transfer amount");
    }
  };
  




  return (
    <>
      {/* Navigation bar */}
      <Navbar />

      {/* Render IndexMain component if showListBtn is true */}
      {showListBtn && (
        <IndexMain
          view_customer_btn={view_customer_btn}
        />
      )}

      {/* Render CustomerList component if showList is true */}
      {showList && (
        <CustomerList
          onCustomerClick={handleCustomerClick}
          customers={CustomersDatabase}
        />
      )}

      {/* Render CustomerDetail component if a customer is selected */}
      {TransferDeatailPage  && (
        <CustomerDetail
          MoneyFromTransfer={MoneyFromTransfer}
          TransferAmount={TransferAmount}
          onTransferBtnClick={onTransferBtnClick}
        />
      )}

      {/* Render TransferMoneyConfirmation component if TransferConfirmation is true */}
      {TransferConfirmation && (
        <TransferMoneyConfirmation
          MoneyFromTransfer={MoneyFromTransfer}
          MoneyToTransfer={MoneyToTransfer}
          AmountToTransfer={AmountToTransfer}
          HandleTransfer={HandleTransfer}
        />
      )}

      {TransferConfirmed && (
      <TransferConfirmedComponent
      />
      )}
    </>
  );
}

export default App;
