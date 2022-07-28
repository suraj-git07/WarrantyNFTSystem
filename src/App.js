import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Body from "./Body";
import Footer from "./Footer";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Warranty from "../src/abis/Warranty.json";

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

      // if (window.ethereum) {
      //   provider = window.ethereum;
      //   try {
      //     await provider.enable();
      //   } catch {
      //     console.error("user is not allowed to connect with metamask");
      //   }
      // } else if (window.web3) {
      //   provider = window.web3.currentProvider;
      // } else if (!process.env.production) {
      //   // not in production, connected with local blockchain
      //   provider = new Web3.provider.HttpProvider("http://localhost:7545");
      // } else {
      //   console.error("Install Metamask",error);
      // }
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

  return (
    <div className="App">
      <Navbar account={account} />
      <Body account={account} contract={contract} />

      <Footer account={account} contract={contract} />
    </div>
  );
}

export default App;
