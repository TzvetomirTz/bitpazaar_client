import './TopBar.css';
import Logo from '../logo/Logo';
import React, { useState } from 'react';
import { isAddress } from 'web3-validator';
import erc721Adapter from '../../services/contracts/Erc721Adapter';
import { authState } from '../../state/AuthState';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Balance from '../../services/Balance';

// Weird kids section
const { ethers } = require("ethers");
// const bigDecimal = require('js-big-decimal');

function TopBar() {
  const [searchBarState, setSearchBarState] = useState("");
  const [searchResName, setSearchResName] = useState("");
  const connectWallet = authState((state) => state.connectWallet);
  const signer = authState((state) => state.signer);
  // const provider = authState((state) => state.provider);
  const walletConnected = authState((state) => state.connected);
  const [ethBalance, setEthBalance] = useState(0);
  const [wethBalance, setWethBalance] = useState(0);

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

  async function triggerConnectWallet() {
		if(typeof window.ethereum != 'undefined') {
			const provider = new ethers.BrowserProvider(window.ethereum, "any");
      let signer = null;

      try {
        signer = await provider.getSigner();
        await connectWallet(provider, signer);
      } catch(err) {
        toast.error("Can't connect wallet. Is there an authentication in your wallet provider waiting to be approved already?");
      }

      if (signer !== null) {
        setEthBalance(Number(await Balance.getEthBalance(provider, signer)).toFixed(4));
        setWethBalance(Number(await Balance.getWethBalance(provider, signer)).toFixed(4));
      }
		} else {
      toast.error("Please install Metamask");
    }    
	}

  //TODO: Fix stale auth state
  // const updateBalance = async () => {
  //   setEthBalance(await Balance.getEthBalance(provider, signer));
  // }

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
        {searchResName !== "" && 
          <div className='SearchResWrapper'>
            <div className='SearchRes'>{searchResName}</div>
          </div>
        }
      </div>
      <div className='AuthWrapper'>
        {!walletConnected &&
          <div className='ConnectWalletBtn' onClick={triggerConnectWallet}>Connect Wallet</div>
        }
        {walletConnected &&
          <div className='Balances'>
            <div className='EthBal'>ETH: {ethBalance}</div>
            <div className='WethBal'>WETH: {wethBalance}</div>
          </div>
        }
        {walletConnected &&
          <div className='ProfileIcon'></div>
        }
      </div>
    </div>
  );
}

export default TopBar;
