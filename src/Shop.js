import React from "react";

export default function Shop(props) {
  return (
    <div className="container">
      <div className="card nftCard ">
        <img className="card-img-top nftimg" src={props.Pimg} />
        <div className="card-header">Serial ID: {props.PseriaId}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item nftCardItem">Name: {props.Pname} </li>
          <li className="list-group-item nftCardItem">
            Product Description: {props.Pdesc}{" "}
          </li>
          <li className="list-group-item nftCardItem">
            Price: {props.Pprice}{" "}
          </li>
          <button type="submit" className=" btn btn-outline-light btn-lg">
            Shop Now!!
          </button>
        </ul>
      </div>
      <br></br>
    </div>
  );
}
