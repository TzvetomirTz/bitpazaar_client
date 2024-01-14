import './AuthPage.css'
import authBotImg from '../../assets/auth_bot.jpg'
import metamaskIcon from '../../assets/wallets_icons/metamask_icon.svg'
import { authState } from '../../state/AuthState'
import Authentication from '../../services/Authentication'
import { useNavigate } from 'react-router-dom'
import React, { useCallback } from 'react'

function AuthPage() {
	const stateConnectWallet = authState((state) => state.connectWallet)
	const walletConnected = authState((state) => state.walletConnected)
	const authenticateToBackend = authState((state) => state.authenticateToBackend)
	const authenticatedToBackend = authState((state) => state.authenticatedToBackend)
	const disconnectWallet = authState((state) => state.disconnectWallet)
	const signer = authState((state) => state.signer)
	const provider = authState((state) => state.provider)
  const navigate = useNavigate()

	React.useEffect(() => {
		(async () => {
			if(walletConnected) {
				authToBackend()
			}
		})()
	}, [walletConnected])

	React.useEffect(() => {
		(async () => {
			if(authenticatedToBackend) {
				goToHomePage()
			}
		})()
	}, [authenticatedToBackend])

      const triggerConnectMetamask = async () => {
        if(Object.hasOwn(window, "ethereum")) {
            if(Object.hasOwn(window.ethereum, "isMetaMask")) {
                if(!window.ethereum.isMetaMask) {
                    console.log("Please install Metamask") // ToDo: Move this to toast
                }

                await Authentication.connectWallet(stateConnectWallet)
            } else {
                console.log("Please install Metamask") // ToDo: Move this to toast
            }
        } else {
            console.log("Please install Metamask") // ToDo: Move this to toast
        }
	}

	const authToBackend = async () => {
		const accToken = await Authentication.generateAcsToken(provider, signer)

		if(accToken !== "") {
			authenticateToBackend(accToken)
		} else {
			disconnectWallet() // Keeps the state clean in case of signing rejection
		}
	}

	const goToHomePage = useCallback(
    () => {
			navigate('/', {replace: false});
    }, [navigate]
  );

	return <div className='AuthPage'>
		<div className='AuthPageLeftSection'>
			<img className='AuthPic NoSelect' src={authBotImg}></img>
		</div>
		<div className='AuthPageRightSection'>
			<div className='AuthPageRightSectionWrapper'>
				<div className='WelcomeTitle NoSelect'>WELCOME TO BITPAZAAR</div>
				<div className='WelcomeSlogan NoSelect'>An NFT marketplace focused on providing low fees and social utilities</div>
				<div className='ConnectNowText NoSelect'>Connect Now:</div>
				<div className='ConnectButton' onClick={triggerConnectMetamask}>
					<img src={ metamaskIcon } className='WalletIcon NoSelect' />
					<div className='ConnectButtonText NoSelect'> Connect Using Metamask</div>
				</div>
				<div className='AuthFooterText NoSelect'>* More authentication methods are on the way</div>
			</div>
		</div>
	</div>
}

export default AuthPage;
