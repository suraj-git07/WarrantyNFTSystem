import React from "react";
import { useState } from "react";

function ModalComponent(props) {
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
    window.location.reload();
  };
  return (
    <div className="modalLayover">
      <div className="modalContent">
        <div class="modalBodywrapper">
          <div class="modalBodyHeader">
            <h1 class="modalBodyTitle">Claim Warranty</h1>
            <p class="modalBodyDescription">
              Add the details and click on Claim button to claim your warranty.
            </p>
          </div>
          <form class="modalBodyform" action="" onSubmit={handleSubmit}>
            <h4 class="modalBodyInputTitle">Token ID</h4>
            <input
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
              class="modalBodyinput"
              type="text"
            />
            <h4 class="modalBodyInputTitle">Token URI</h4>
            <input
              class="modalBodyinput"
              type="text"
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
            <h4 class="modalBodyInputTitle">Serial ID</h4>
            <input
              class="modalBodyinput"
              type="text"
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
            <button type="submit" class="modalBodyButton">Claim</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
