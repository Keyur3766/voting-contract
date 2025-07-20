import NavbarComponent from "./NavbarComponent";
import { useParams } from "react-router-dom";
function ChairPersonComponent() {
     const { id } = useParams();
    return (
      <>
            <NavbarComponent name={ 'Connected as chair-person'} walletAddress={id} />
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
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Candidates"
                required
              />
            </div>
          </form>
        </div>
      </>
    );
}

export default ChairPersonComponent;
