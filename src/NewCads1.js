import React from "react";
import Article1 from "./Article1";

export default function NewCads1(props) {
  return (
    <div id="cardsSection">
      <section id="cardSections" className="cards">
        <Article1
          nftImgsrc={props.nftImgsrc}
          nftdisc={props.nftdisc}
          validity={props.validity}
          tokenURI={props.tokenURI}
          nftName={props.nftName}
          tokenId={props.tokenId}
        />
      </section>
    </div>
  );
}
