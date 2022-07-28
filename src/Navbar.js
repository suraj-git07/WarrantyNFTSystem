import React from "react";

export default function Navbar(props) {
  return (
    <div>
      <div className=" navbar">
        <h2 className="navheading">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8044/8044896.png"
            alt="trolley img"
            width="35px"
            height="35px"
            className="navimg"
          ></img>
          WarranFT
        </h2>

        <button type="button" className="btn btn-outline-light navadd">
          <span> </span>
          {props.account ? props.account : "Connect with Metamask"}
        </button>
      </div>
    </div>
  );
}
