import './HomePage.css'
import TopBar from '../../components/topBar/TopBar'
import Authentication from '../../services/Authentication'
import { authState } from '../../state/AuthState'

function HomePage() {
	const stateConnectWallet = authState((state) => state.connectWallet)
	const authenticatedToBackend = authState((state) => state.authenticatedToBackend)
	const authenticateToBackend = authState((state) => state.authenticateToBackend)

  Authentication.tryToContinueSessionIfNeeded(authenticatedToBackend, stateConnectWallet, authenticateToBackend)

  return (
    <div className="HomePage">
      <TopBar />
      <div className="HomePageContainer">HOME PAGE</div>
    </div>
  )
}

export default HomePage;
