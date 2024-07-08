import React from "react";

export default function CustomerList({ onCustomerClick, customers }) {
  return (
    <>
      <div className="container d-flex  text-center mt-5">
        <table className="m-auto mt-5 fs-5">
          <thead className="bg-custom-blue text-black">
            <tr>
              <th className="px-6 mx-5">Account Number</th>
              <th className="px-6 mx-5 ">Name</th>
              <th className="px-6 mx-5 ">Email</th>
              <th className="px-6 mx-5 ">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                className="customer-table-row text-white-50 pointer"
                key={customer.CustomerID}
                onClick={() => onCustomerClick(customer.CustomerID)}
              >
                <td>{customer.CustomerID}</td>
                <td>{customer.Name}</td>
                <td>{customer.Email}</td>
                <td>{customer.Phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
