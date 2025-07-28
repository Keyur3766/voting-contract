import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useParams } from "react-router-dom";
import { useWeb3Context } from "../context/Web3Context";
function ChairPersonComponent() {
  const { id } = useParams();
  const [candidates, setCandidate] = useState([]);
  const [availableCandidate, setAvailableCandidate] = useState([]);
  const { contract, signer, connectWallet } = useWeb3Context();
  const handleChange = (event) => {
    const values = event.target.value.split(",");
    
    let candidateArray = [];
    if (values) {
      values.map((candidate) => {
        if (candidate != "") {
          candidateArray.push(candidate);
        }
      });

      setCandidate(candidateArray); 
    }
  };

  async function getConnection() {
    await connectWallet();
  }

  useEffect(() => {
    if (!contract) {
      // console.log("✅ Contract is ready", contract);
      // console.log(contract);
      // safe to call contract functions here
      getConnection();
    }
  }, []);

  const handleAddCandidates = async () => {
    await contract.addCandidates(candidates);
  }


  const handleGetCandidates = async () => {
    const availableCandidates = await contract.getCandidates();
    setAvailableCandidate(availableCandidates);
  }

    return (
      <>
        <NavbarComponent
          name={"Connected as chair-person"}
          walletAddress={id}
        />
        <div className="min-w-40 container pt-36">
          <form>
            <div>
              <label
                for="company"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Voting candidates
              </label>
              <input
                type="text"
                id="company"
                onChange={handleChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Candidates"
                required
              />
            </div>
          </form>
          <div>
            <button
              onClick={handleAddCandidates}
              class="mt-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Add Candidates
            </button>

            <button
              onClick={handleGetCandidates}
              class="ml-5 mt-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Get Candidates
            </button>
          </div>

          {availableCandidate.length > 0 ? (
            availableCandidate.map((candidate) => (
              <div>{candidate}</div>
            ))
          ) : (
            <p>No candidates available</p>
          )}
        </div>
      </>
    );
}

export default ChairPersonComponent;
