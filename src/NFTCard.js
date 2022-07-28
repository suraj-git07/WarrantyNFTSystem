import { __esModule } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect, useState } from "react";

export default function NFTCard(props) {
  const tokenId = props.tokenId;
  const tokenURI = props.tokenURI;
  const contract = props.contract;

  const [validity, setvalidity] = useState("");
  const [validTill, setValidTill] = useState(0);

  useEffect(() => {
    const getValidity = async () => {
      let _isvalid = await contract.methods.isValid(tokenId).call();
      let _validTill = await contract.methods.validTill(tokenId).call();
      _isvalid = _isvalid.toString();
      _validTill = _validTill.toNumber();
      setvalidity(_isvalid);
      setValidTill(_validTill);
      console.log("logging validity");
      console.log(validity);
      console.log(validTill);
    };

    tokenId && getValidity();
  }, [tokenId]);

  return (
    <div className="container">
      <div className="card nftCard">
        <div className="card-header">NFT ID: {tokenId}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item nftCardItem">
            NFT URI: {tokenURI ? tokenURI : "Not minted"}{" "}
          </li>
          <li className="list-group-item nftCardItem">Validity: {validity}</li>
          <li className="list-group-item nftCardItem">
            ValidTill: {validTill}
          </li>
        </ul>
      </div>
      <br></br>
    </div>
  );
}
