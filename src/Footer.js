import React, { useState } from "react";

export default function Footer(props) {
  const [claimData, setClaimData] = useState({
    TokenID: 0,
    TokenURI: "",
    SerialID: 0,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(claimData);
    const contract = props.contract;
    const _tokenId = claimData.TokenID;
    const _tokenURI = claimData.TokenURI;
    const _serialId = claimData.SerialID;

    let result = await contract.methods
      .claimWarranty(_tokenId, _tokenURI, _serialId)
      .send({ from: props.account });
    console.log(result.logs[0].args);
  };

  return (
    <div className="claimNFT">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          name="TokenID"
          value={claimData.TokenID}
          onChange={(e) => {
            setClaimData((prevData) => {
              return {
                ...prevData,
                [e.target.name]: e.target.value,
              };
            });
          }}
          id="TokenID"
          placeholder="TokenID"
        />
        <input
          type="text"
          className="form-control"
          name="TokenURI"
          value={claimData.TokenURI}
          onChange={(e) => {
            setClaimData((prevData) => {
              return {
                ...prevData,
                [e.target.name]: e.target.value,
              };
            });
          }}
          id="TokenURI"
          placeholder="TokenURI"
        />
        <input
          type="text"
          className="form-control"
          name="SerialID"
          value={claimData.SerialID}
          onChange={(e) => {
            setClaimData((prevData) => {
              return {
                ...prevData,
                [e.target.name]: e.target.value,
              };
            });
          }}
          id="SerialID"
          placeholder="SerialID"
        />
        <br></br>
        <button type="submit" className=" btn btn-outline-light claimbtn">
          Claim NFT!!
        </button>
      </form>
    </div>
  );
}
