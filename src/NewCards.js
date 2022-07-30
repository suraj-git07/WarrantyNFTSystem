import React from "react";
import "./card.css";
import Article from "./Article";
import notes from "./ProductData/book";

export const NewCards = () => {
  const showShopData = (data) => {
    return (
      <Article
        Pimg={data["image"]}
        PseriaId={data["attributes"]["serialNumber"]}
        Pname={data["attributes"]["name"]}
        Pdesc={data["description"]}
        Pprice={data["attributes"]["price"]}
      />
    );
  };

  return (
    <div id="cardsSection">
      <section id="cardSections" className="cards">
        {notes.map(showShopData)}
      </section>
    </div>
  );
};
