import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

function VoterComponent() {
    const { id } = useParams();
    return (
        
            <NavbarComponent name={'Connected as Voter'} walletAddress={id} />
        
    );
}

export default VoterComponent;
