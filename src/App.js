import { useState, useEffect } from "react";
import "./App.css";
import "./Shop.css";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Warranty from "../src/abis/Warranty.json";
import ShopData from "./ProductData/book.js";
import Shop from "./Shop";
import ShopNav from "./ShopNav";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
  });

  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        provider.request({ method: "eth_requestAccounts" });
        // console.log(provider);
        setWeb3Api({
          web3: new Web3(provider),
          provider,
        });
      } else {
        console.error("Install Metamask");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      console.log(accounts);
      setAccount(accounts[0]);
    };
    web3Api.web3 && getAccounts();
  }, [web3Api.web3, account]);

  //creating a contract instance

  useEffect(() => {
    const contractInstance = async () => {
      const networkId = await web3Api.web3.eth.net.getId();
      const warrantyData = Warranty.networks[networkId];
      let contract = new web3Api.web3.eth.Contract(
        Warranty.abi,
        warrantyData.address
      );
      console.log(contract);

      setContract(contract);
    };
    web3Api.web3 && contractInstance();
  }, [web3Api.web3]);

  const showShopData = (data) => {
    return (
      <Shop
        Pimg={data["image"]}
        PseriaId={data["attributes"]["serialNumber"]}
        Pname={data["attributes"]["name"]}
        Pdesc={data["description"]}
        Pprice={data["attributes"]["price"]}
      />
    );
  };

  // // making setInterval for changinf nft status

  // // const checkValidation = setTimeout(checkValid, 120);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/shop"
            element={
              <div className="ShopCardContainer">
                <ShopNav />

                {ShopData.map(showShopData)}
              </div>
            }
          ></Route>
          <Route
            exact
            path="/"
            element={
              <>
                <Navbar account={account} />
                <Body account={account} contract={contract} />

                <Footer account={account} contract={contract} />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
