import './TopBar.css';
import Logo from '../logo/Logo';
import React, { useState } from 'react';
import { isAddress } from 'web3-validator';
import erc721Adapter from '../../services/contracts/Erc721Adapter';
import { authState } from '../../state/AuthState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { ethers } = require("ethers");

function TopBar() {
  const [searchBarState, setSearchBarState] = useState("");
  const [searchResErc721Name, setSearchResErc721Name] = useState("");
  const connectWallet = authState((state) => state.connectWallet);
  const signer = authState((state) => state.signer);
  const walletConnected = authState((state) => state.connected);

  React.useEffect(() => {
    (async () => {
      if(searchBarState !== "") {
        if(isAddress(searchBarState.target.value)) {
          setSearchResErc721Name(await erc721Adapter.getErc721Name(signer, searchBarState.target.value)); // Must be connected to wallet
        } else {
          setSearchResErc721Name("");
        }
      } else {
        setSearchResErc721Name("");
      }
    })()
  }, [searchBarState, signer]);

  async function triggerConnectWallet() {
		if(typeof window.ethereum != 'undefined') {
			const provider = new ethers.BrowserProvider(window.ethereum, "any");

      try {
        const signer = await provider.getSigner();
        connectWallet(provider, signer);
      } catch(err) {
        toast.error("Can't connect wallet. Is there an authentication in your wallet provider waiting to be approved already?");
      }
		} else {
      toast.error("Please install Metamask");
    }
	}

  const handleKeyDown = (event) => {
    if(event.key === 'Enter') {
      // ToDo: Open first result
    } else if(event.key === "Escape") {
      document.activeElement.blur();
    }
  }

    return (
      <div className="TopBar">
        <Logo className="LogoIcon" />
        <div className='SearchWrapper'>
          <input className='SearchBar' onKeyDown={handleKeyDown} onChange={setSearchBarState}></input>
          {searchResErc721Name !== "" && 
            <div className='SearchResWrapper'>{searchResErc721Name}</div>
          }
        </div>
        <div className='AuthWrapper'>
          {!walletConnected &&
            <div className='ConnectWalletBtn' onClick={triggerConnectWallet}>Connect Wallet</div>
          }
          {walletConnected &&
            <div className='AuthAddr'> {signer.address} </div>
          }
        </div>
      </div>
    );
  }

  export default TopBar;
