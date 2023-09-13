import './TopBar.css';
import Logo from '../logo/Logo';
import React, {useRef, useState, useCallback} from 'react';
import { isAddress } from 'web3-validator';
import erc721Adapter from '../../services/contracts/Erc721Adapter';
import authState from '../../state/AuthState';
const { ethers } = require("ethers");

function TopBar() {
  const [searchBarState, setSearchBarState] = useState("");
  const [searchResErc721Name, setSearchResErc721Name] = useState("");

  React.useEffect(() => {
    connectWallet();
  }, []);

  React.useEffect(() => {
    if(searchBarState !== "") {
      if(isAddress(searchBarState.target.value)) {
        console.log("We've got an address!");
        setSearchResErc721Name(erc721Adapter.getErc721Name());
      }
    }
  }, [searchBarState]);

  async function connectWallet() {
		if(typeof window.ethereum != 'undefined') {
			let provider = new ethers.providers.Web3Provider(window.ethereum, "any");
			// await provider.send("eth_requestAccounts", []);
			// signer.current = provider.getSigner();
			// setWalletAddr(await signer.current.getAddress());
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
          <div className='SearchRes'>asdf: {searchResErc721Name}</div>
        </div>
        <div className='AuthIcon'></div>
      </div>
    );
  }

  export default TopBar;
