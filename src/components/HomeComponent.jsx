import { useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import VoterContract from "../abis/VoterContract.json";
import NavbarComponent from "./NavbarComponent";

function HomeComponent() {
  const navigate = useNavigate();

    const navigateToRoute = async(route) => {
        const walletAddress = await connectWithBlockchain();
        navigate(`${route}/${walletAddress}`);

  };

  const hasConnectedRef = useRef(false);
  const [walletAddress, setAddress] = useState();

  const connectWithBlockchain = async () => {
    if (hasConnectedRef.current) return; // Prevent multiple calls
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
    setAddress(myAddress);
    console.log("Your wallet address:", myAddress);

    // Get your balance
    const balance = await provider.getBalance(myAddress);
    console.log("Your balance:", ethers.utils.formatEther(balance), "ETH");


    const voterContract = new ethers.Contract(
      "0xBD43D0A8a574C520fc5B1c1aeA881041e23096a8",
      VoterContract,
      provider
    );

    console.warn(voterContract);
    

      return myAddress;
    // const tx = signer.sendTransaction({
    //   to: "0xEAc65b925B274cdd8a501DD6A9F148A611dC990d",
    //   value: ethers.utils.parseEther("0.0001"),
    // });
  };

//   useEffect(() => {
//     connectWithBlockchain();
//   }, []);

  return (
    <>
      <NavbarComponent />
      <div className="w-full flex flex-col justify-center items-center h-screen">
        <button
          type="button"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={() => navigateToRoute("chair-person")}
        >
          Connect as ChairPerson
        </button>
        <button
          type="button"
          class="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={() => navigateToRoute("voter")}
        >
          Connect as Voter
        </button>
      </div>
    </>
  );
}

export default HomeComponent;
