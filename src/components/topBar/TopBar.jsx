import './TopBar.css';
import Logo from '../logo/Logo';
import React, { useState, useCallback } from 'react';
import { isAddress } from 'web3-validator';
import erc721Adapter from '../../services/contracts/Erc721Adapter';
import { authState } from '../../state/AuthState';
import 'react-toastify/dist/ReactToastify.css';
import Balance from '../../services/Balance';
import { useNavigate } from 'react-router-dom';
import walletIcon from '../../assets/wallet_icon.svg';

function TopBar() {
  const navigate = useNavigate();
  const [searchBarState, setSearchBarState] = useState("");
  const [searchResName, setSearchResName] = useState("");
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

  const goToAuthPage = useCallback(
    async () => {
      const redirPath = '/auth';

      if(redirPath !== window.location.pathname) {
        navigate(redirPath, {replace: false});
      }
    }, [navigate]
  )

  return (
    <div className="TopBar">
      <div className="LogoIcon" onClick={goToHomePage}>
        <Logo />
      </div>
      <div className='NavButtonsWrapper'>
        <div className='NavButton'>Collections</div>
        <div className='NavButton'>Placements</div>
        <div className='NavButton'>Drops</div>
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
          <div className='ConnectWalletBtn' onClick={goToAuthPage}>Connect</div>
        }
      </div>
      {walletConnected &&
          <div className='BalancesWrapper'>
            <div className='WalletIconWrapper'>
              <img className='WalletIcon' src={walletIcon}/>
            </div>
            <div className='EthBal'>ETH: {ethBalance}</div>
            <div className='WethBal'>WETH: {wethBalance}</div>
          </div>
        }
        {walletConnected &&
          <div className='ProfileIcon' onClick={goToProfilePage}></div>
        }
    </div>
  );
}

export default TopBar;
