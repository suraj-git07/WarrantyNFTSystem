import { __esModule } from "@testing-library/jest-dom/dist/matchers";
import React, { useEffect, useState } from "react";

export default function NFTCard(props) {
  const tokenId = props.tokenId;
  const tokenURI = props.tokenURI;
  const contract = props.contract;

  const [validity, setvalidity] = useState("");
  const [validTill, setValidTill] = useState(0);
  const [nftImgsrc, setImgsrc] = useState("");
  const [nftdisc, setNftdisc] = useState("");
  const [nftName, setNftName] = useState("");
  const [nftPrice, setNftPrice] = useState("");

  // loadJSON method to open the JSON file.
  function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        } else {
          console.log("Error happed :", xhr);
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }

  useEffect(() => {
    const getValidity = async () => {
      let _isvalid = await contract.methods.isValid(tokenId).call();
      let _validTill = await contract.methods.validTill(tokenId).call();
      _isvalid = _isvalid.toString();

      _validTill = _validTill.toNumber();
      setvalidity(_isvalid);
      setValidTill(_validTill);
    };

    const NFTImgData = (data) => {
      let imgsrc = data["image"];
      let disc = data["description"];
      let name = data["attributes"]["name"];
      let price = data["attributes"]["price"];
      console.log(imgsrc);
      console.log(disc);
      console.log(name);
      console.log(price);
      setImgsrc(imgsrc);
      setNftdisc(disc);
      setNftName(name);
      setNftPrice(price);
    };

    tokenId && getValidity();
    tokenURI && loadJSON(tokenURI, NFTImgData, "jsonp");
  }, [tokenId]);

  return (
    <div className="container ">
      <div className="card nftCard ">
        <img
          className="card-img-top nftimg"
          src={
            nftImgsrc
              ? nftImgsrc
              : "https://cdn-icons-png.flaticon.com/512/6642/6642204.png"
          }
          alt="nftimg"
        />
        <div className="card-header ">NFT ID: {tokenId}</div>
        <ul className="list-group list-group-flush">
          {/* <li className="list-group-item nftCardItem">
            NFT URI: {tokenURI ? tokenURI : "Not minted"}{" "}
          </li> */}
          <li className="list-group-item nftCardItem ">
            Name: {tokenURI ? nftName : "Not minted"}{" "}
          </li>
          <li className="list-group-item nftCardItem">
            Product Description: {tokenURI ? nftdisc : "Not Minted"}{" "}
          </li>
          <li className="list-group-item nftCardItem">
            Price: {tokenURI ? nftPrice : "Not minted"}{" "}
          </li>
          <li className="list-group-item nftCardItem">Validity: {validity}</li>
          {/* <li className="list-group-item nftCardItem">
            ValidTill: {validTill}
          </li> */}
        </ul>
      </div>
      <br></br>
    </div>
  );
}
