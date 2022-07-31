import React from "react";
import { useState, useEffect } from "react";
import NFTCard from "./NFTCard";

export default function Body(props) {
  let connectedAcc = props.account;
  const contract = props.contract;

  const [usertokenIDs, setUserTokenID] = useState([]);
  const [userTokenURIs, setUserTokenURI] = useState({});

  const createNFTCard = (_tokenId) => {
    let _tokenURI = userTokenURIs[_tokenId];
    // console.log(".......");
    return (
      <NFTCard tokenId={_tokenId} tokenURI={_tokenURI} contract={contract} />
    );
  };

  useEffect(
    () => {
      const getTokenId = async () => {
        let tokenIDs = [];
        let tokenURIs = {};
        let currentId = await contract.methods.tokenId().call();
        // console.log(currentId.toNumber());
        for (let i = 1; i <= currentId.toNumber(); i++) {
          let thisIduser = await contract.methods.tokenIdToPerson(i).call();
          // console.log(thisIduser);
          if (thisIduser === connectedAcc) {
            tokenIDs.push(i);
            let _tokenURI = await contract.methods.tokenIdTotokenURI(i).call();
            tokenURIs[i] = _tokenURI;
          }
        }
        // console.log(tokenIDs);
        // console.log(tokenURIs);
        setUserTokenID(tokenIDs);
        setUserTokenURI(tokenURIs);
        // console.log("hello");
        console.log(usertokenIDs);
        console.log(userTokenURIs);
      };

      contract && getTokenId();
    },

    [contract],
    [connectedAcc]
  );

  return (
    <div className="bodyouterdiv">
      <div className="nftcontent col-4">
        {usertokenIDs.length > 0 ? (
          usertokenIDs.map(createNFTCard)
        ) : (
          <div className="notBought">
            <img
              className="notBoughtimg"
              src="https://cdn0.iconfinder.com/data/icons/empty-state-vol-1-outline/64/16_empty_box_state_package_no_data_nothing-128.png"
              alt="Go for shopping"
            />
            <h1 className="notBoughttext">Go for Shooping</h1>
          </div>
        )}
      </div>
      <button
        type="button"
        class="btn btn-outline-warning refreshbtn"
        onClick={async () => {
          await contract.methods.checkValid().send({ from: connectedAcc });
        }}
      >
        Refresh Validity
      </button>
    </div>
  );
}

// https://ipfs.io/ipfs/QmbrvSq3BCGS6yLBHrTw3rEEzMKiApJBAQzfwLqnfmy8j4
