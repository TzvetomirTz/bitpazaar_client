import './TopBar.css';
import Logo from '../logo/Logo';
import React, {useRef, useState, useCallback} from 'react';
import { isAddress } from 'web3-validator';
import erc721Adapter from '../../services/contracts/Erc721Adapter';
import { authState } from '../../state/AuthState';
import { create } from "zustand";
const { ethers } = require("ethers");

function TopBar() {
  const [searchBarState, setSearchBarState] = useState("");
  const [searchResErc721Name, setSearchResErc721Name] = useState("");
  const setAuthState = authState((state) => state.setSigner);
  const signer = authState((state) => state.signer);

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
			const provider = new ethers.BrowserProvider(window.ethereum, "any");
      const signer = await provider.getSigner();

      console.log("addr: " + signer.address);
      setAuthState(signer);
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
        <div className='AuthIcon'>{signer.address}</div>
      </div>
    );
  }

  export default TopBar;
