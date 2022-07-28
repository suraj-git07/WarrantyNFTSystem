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
      <div className="nftcontent">{usertokenIDs.map(createNFTCard)}</div>
    </div>
  );
}

// https://ipfs.io/ipfs/QmbrvSq3BCGS6yLBHrTw3rEEzMKiApJBAQzfwLqnfmy8j4