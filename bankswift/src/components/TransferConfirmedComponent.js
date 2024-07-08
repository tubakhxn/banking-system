import React from "react";

function TransferConfirmed() {
  return (
    <div className="container d-flex row m-auto mt-5">
      <div className="row m-auto">
        <h1 className="text-success text-center mt-5 ">Transfer successful</h1>
      </div>
      <div className="row m-auto mt-5">
        <a href="/" className="w-auto m-auto">
          <button type="button" class="btn btn-outline-info ">
            {" "}
            Click Here To Continue
          </button>
        </a>
      </div>
    </div>
  );
}

export default TransferConfirmed;
