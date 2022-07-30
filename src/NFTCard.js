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

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  return (
    // <div className="container ">
    //   <div className="card nftCard ">
    //     <img
    //       className="card-img-top nftimg"
    //       src={
    //         nftImgsrc
    //           ? nftImgsrc
    //           : "https://cdn-icons-png.flaticon.com/512/6642/6642204.png"
    //       }
    //       alt="nftimg"
    //     />
    //     <div className="card-header ">NFT ID: {tokenId}</div>
    //     <ul className="list-group list-group-flush">
    //       {/* <li className="list-group-item nftCardItem">
    //         NFT URI: {tokenURI ? tokenURI : "Not minted"}{" "}
    //       </li> */}
    //       <li className="list-group-item nftCardItem ">
    //         Name: {tokenURI ? nftName : "Not minted"}{" "}
    //       </li>
    //       <li className="list-group-item nftCardItem">
    //         Product Description: {tokenURI ? nftdisc : "Not Minted"}{" "}
    //       </li>
    //       <li className="list-group-item nftCardItem">
    //         Price: {tokenURI ? nftPrice : "Not minted"}{" "}
    //       </li>
    //       <li className="list-group-item nftCardItem">Validity: {validity}</li>
    //       {/* <li className="list-group-item nftCardItem">
    //         ValidTill: {validTill}
    //       </li> */}
    //     </ul>
    //   </div>
    //   <br></br>
    // </div>
    <section className="lineContainer">
      <div class="blog-card python" style={{minWidth:'550px', backgroundImage:`url(${nftImgsrc ? nftImgsrc : "https://cdn-icons-png.flaticon.com/512/6642/6642204.png"})`}}>
        <div class="content-mask">
          <h1 style={{paddingRight:'20px'}}>{tokenURI ? nftName : "Not minted"}</h1>
          <p style={{color: 'black', fontWeight: '400'}}><b>NFT ID: {tokenId}</b></p>
          
          <span className="priceContainer"><div class="post-detail">
            <span class="icon"> 
              <svg
                class="svg-inline--fa fa-calendar-alt fa-w-14"
                aria-hidden="true"
                data-prefix="far"
                data-icon="calendar-alt"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M148 288h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm108-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 96v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm-96 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm96-260v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"
                ></path>
              </svg>
            </span>
            <span class="date">{timeConverter(validTill)}</span>
          </div>
          <span style={Date.now()>validTill?{margin:'0', backgroundColor: 'red'}:{margin:'0'}} className="python category">{Date.now()>validTill?"Warranty Invalid":"Warranty Valid"}</span> </span>
        </div>
        <div className="horizontal"></div>
      </div>
    </section>
  );
}
