import { ethers } from "ethers";
import TopBar from "../../components/topBar/TopBar";
import { authState } from '../../state/AuthState';
import Authentication from "../../services/Authentication";

function HomePage() {
  const walletConnected = authState((state) => state.walletConnected);
  const signer = authState((state) => state.signer);
  const provider = authState((state) => state.provider);

  const doThing = async () => {
    if(walletConnected) {
      Authentication.authenticate(provider, signer);
    } else {
      console.log("No wallet connected. Wallet connection is required for this action.");
    }
  }

  return (
    <div>
      <TopBar />
      <div>HOME PAGE</div>
      <button onClick={doThing}>DO THE THING</button>
    </div>
  );
}

export default HomePage;
