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
    // triggerConnectWallet();
  }, []);

  React.useEffect(() => {
    (async () => {
      if(searchBarState !== "") {
        if(isAddress(searchBarState.target.value)) {
          console.log("We've got an address!");
          setSearchResErc721Name(await erc721Adapter.getErc721Name(signer, searchBarState.target.value));
        }
      }
    })()
  }, [searchBarState]);

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

  const searchGo = (event) => {
    if (event.key === 'Enter') {
      // ToDo: Open contract page if address is valid
    }
  }

    return (
      <div className="TopBar">
        <Logo />
        <div className='SearchWrapper'>
          <input className='SearchBar' onKeyDown={searchGo} onChange={setSearchBarState}></input>
          <div className='SearchRes'>{searchResErc721Name}</div>
        </div>
        <div className='AuthWrapper'>
          <div className='AuthIcon' onClick={triggerConnectWallet}></div>
          {walletConnected &&
            <div className='AuthAddr'> {signer.address} </div>
          }
        </div>
      </div>
    );
  }

  export default TopBar;