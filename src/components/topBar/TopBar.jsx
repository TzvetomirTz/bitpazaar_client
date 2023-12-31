import './TopBar.css';
import Logo from '../logo/Logo';
import React, { useState, useCallback } from 'react';
import { isAddress } from 'web3-validator';
import erc721Adapter from '../../services/contracts/Erc721Adapter';
import { authState } from '../../state/AuthState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Balance from '../../services/Balance';
import { useNavigate } from 'react-router-dom';
import Authentication from '../../services/Authentication';

function TopBar() {
  const navigate = useNavigate();
  const [searchBarState, setSearchBarState] = useState("");
  const [searchResName, setSearchResName] = useState("");
  const stateConnectWallet = authState((state) => state.connectWallet);
  const authenticateToBackend = authState((state) => state.authenticateToBackend);
  const authenticatedToBackend = authState((state) => state.authenticatedToBackend);
  const signer = authState((state) => state.signer);
  const provider = authState((state) => state.provider);
  const walletConnected = authState((state) => state.walletConnected);
  const [ethBalance, setEthBalance] = useState("0.0000");
  const [wethBalance, setWethBalance] = useState("0.0000");

  React.useEffect(() => {
    (async () => {
      if(walletConnected) {
        updateBalance();
      }
    })()
  }, [walletConnected]);

  React.useEffect(() => {
    (async () => {
      if(searchBarState !== "") {
        if(isAddress(searchBarState.target.value)) {
          setSearchResName(await erc721Adapter.getErc721Name(signer, searchBarState.target.value)); // Must be connected to wallet
        } else {
          setSearchResName("");
        }
      } else {
        setSearchResName("");
      }
    })()
  }, [searchBarState, signer]);

  const triggerConnectWallet = async () => {
		if(typeof window.ethereum != 'undefined') {
      try {
        await Authentication.connectWallet(stateConnectWallet);

        setEthBalance(Number(await Balance.getEthBalance(provider, signer)).toFixed(4));
        setWethBalance(Number(await Balance.getWethBalance(provider, signer)).toFixed(4));
      } catch(err) {
        toast.error("Can't connect wallet. Is there an authentication in your wallet provider waiting to be approved already?");
      }
		} else {
      toast.error("Please install Metamask");
    }
	}

  const updateBalance = async () => {
    setEthBalance(Number(await Balance.getEthBalance(provider, signer)).toFixed(4));
    setWethBalance(Number(await Balance.getWethBalance(provider, signer)).toFixed(4));
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      // ToDo: Open first result
    } else if(event.key === "Escape") {
      document.activeElement.blur();
    }
  }

  const goToHomePage = useCallback(
    () => {
      const redirPath = '/';

      if(redirPath !== window.location.pathname) {
        navigate(redirPath, {replace: false});
      }
    }, [navigate]
  );

  const goToProfilePage = useCallback(
    async () => {
      const redirPath = '/profile/' + await signer.getAddress();

      if(redirPath !== window.location.pathname) {
        navigate(redirPath, {replace: false});
      }
    }, [navigate, signer]
  );

  const authToBackend = async () => {
    const accToken = await Authentication.generateAcsToken(provider, signer);
    console.log(accToken); // ToDo: delete this at some point lol
    authenticateToBackend(accToken);
  };

  return (
    <div className="TopBar">
      <div className="LogoIcon" onClick={goToHomePage}>
        <Logo />
      </div>
      <div className='SearchWrapper'>
        <input className='SearchBar' onKeyDown={handleKeyDown} onChange={setSearchBarState}></input>
        {searchResName !== "" && 
          <div className='SearchResWrapper'>
            <div className='SearchRes'>{searchResName}</div>
          </div>
        }
      </div>
      <div className='AuthWrapper'>
        {!walletConnected &&
          <div className='ConnectWalletBtn' onClick={triggerConnectWallet}>Connect</div>
        }
        {walletConnected && !authenticatedToBackend &&
          <div className='authToBackendBtn' onClick={authToBackend}>
            Authenticate To Backend
          </div>
        }
        {walletConnected &&
          <div className='Balances'>
            <div className='EthBal'>ETH: {ethBalance}</div>
            <div className='TokenSwapIcon'>SWAP</div>
            <div className='WethBal'>WETH: {wethBalance}</div>
          </div>
        }
        {walletConnected &&
          <div className='ProfileIcon' onClick={goToProfilePage}></div>
        }
      </div>
    </div>
  );
}

export default TopBar;
