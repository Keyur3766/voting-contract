import { createContext, useContext, useState, useRef } from "react";
import { ethers } from "ethers";
import VoterContract from "../abis/VoterContract.json";

const Web3Context = createContext({
  contract: null,
  signer: null,
  account: null,
  connectWallet: null,
});

const useWeb3Context = () => useContext(Web3Context);

const Web3Provider = ({ children }) => {
  if (!window.ethereum) {
    alert("MetaMask not detected!");
    return;
  }
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const hasConnectedRef = useRef(false);

  const connectWallet = async () => {
    // if (hasConnectedRef.current) return; // Prevent multiple calls
    hasConnectedRef.current = true;
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
    const myAddress = await signer.getAddress();
    console.log("Your wallet address:", myAddress);

    // Get your balance
    const balance = await provider.getBalance(myAddress);
    console.log("Your balance:", ethers.utils.formatEther(balance), "ETH");

    const voterContract = new ethers.Contract(
      "0xBD43D0A8a574C520fc5B1c1aeA881041e23096a8",
      VoterContract,
      provider
    );

    

    setSigner(signer);
    setContract(voterContract);
    setAccount(myAddress);
    return myAddress;
    // const tx = signer.sendTransaction({
    //   to: "0xEAc65b925B274cdd8a501DD6A9F148A611dC990d",
    //   value: ethers.utils.parseEther("0.0001"),
    // });
  };

  return (
    <Web3Context.Provider value={{ contract, signer, account, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export { Web3Provider, useWeb3Context };
