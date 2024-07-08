import React from "react";

export default function IndexMain({view_customer_btn}) {
  return (
    <>
      <div className="container d-flex">
        <button type="button" onClick={view_customer_btn} class="btn mx-auto w-auto view-customer-btn ">
            View All Customer
        </button>
      </div>
    </>
  );
}
