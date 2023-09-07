import './TopBar.css';
import Logo from '../logo/Logo';
import React, {useRef, useState, useCallback} from 'react';

function TopBar() {
  const [searchBarState, setSearchBarState] = useState("");

  React.useEffect(() => {
    if(searchBarState !== "") {
      console.log("input: " + searchBarState.target.value);
    }
  }, [searchBarState]);

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
        </div>
      </div>
    );
  }

  export default TopBar;
