import './ProfilePage.css'
import TopBar from "../../components/topBar/TopBar"
import TopBarSpacer from '../../components/spacer/TopBarSpacer'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileClient from '../../clients/ProfileClient'
import { authState } from '../../state/AuthState'
import NftList from '../../components/nftList/NftList'
import defaultPortrait from '../../assets/default_portrait.jpg'
import Clipboard from '../../services/Clipboard'
import etherscranIcon from '../../assets/etherscan_logo.svg'
import copyIcon from '../../assets/copy_icon.svg'
import plusIcon from '../../assets/plus_icon.svg'
import loadingAnimation from '../../assets/animations/loading_animation.gif'
import Authentication from '../../services/Authentication'
import 'react-dropdown/style.css';
import '../../styles/NftListDropdown.css'
import Dropdown from 'react-dropdown'

function ProfilePage() {
  const { profileAddress } = useParams()
  const walletConnected = authState((state) => state.walletConnected)
  const accessKey = authState((state) => state.accessKey)
  const [hmNftsOwned, setHmNftsOwned] = useState(0)
  const [ownedNfts, setOwnedNfts] = useState([])
  const signer = authState((state) => state.signer)
  const [nftListIsLoading, setNftListIsLoading] = useState(false)
	const stateConnectWallet = authState((state) => state.connectWallet)
	const authenticatedToBackend = authState((state) => state.authenticatedToBackend)
	const authenticateToBackend = authState((state) => state.authenticateToBackend)
  const [pageKey, setPageKey] = useState(null)
  const [moreOwnedNftsLoading, setMoreOwnedNftsLoading] = useState(false)

  // const [searchBarState, setSearchBarState] = useState("")
  // const [collectionFilter, setCollectionFilter] = useState(collectionsEmptyFilter)
  // const [ownedNftsCollections, setOwnedNftsCollections] = useState([collectionsEmptyFilter])
  const collectionsEmptyFilter = "All Collections"

  Authentication.tryToContinueSessionIfNeeded(authenticatedToBackend, stateConnectWallet, authenticateToBackend)

  React.useEffect(() => {
    (async () => {
      if(walletConnected) {
        loadProfileNfts()
      }
    })()
  }, [authenticatedToBackend, profileAddress])

  const loadProfileNfts = async () => {
    setOwnedNfts([]) // Clear state when navigating
    setNftListIsLoading(true)

    const nftData = await ProfileClient.getNftsByOwner(accessKey, profileAddress)
    
    setHmNftsOwned(nftData.nftsCount)
    setOwnedNfts([...ownedNfts, ...nftData.nfts])
    setPageKey(nftData.pageKey)

    setNftListIsLoading(false)
  }

  const loadMoreNfts = async () => {
    if(!moreOwnedNftsLoading) {
      setMoreOwnedNftsLoading(true)
      const moreNftData = await ProfileClient.getNftsByOwner(accessKey, profileAddress, pageKey)
  
      setOwnedNfts([...ownedNfts, ...moreNftData.nfts])
      setPageKey(moreNftData.pageKey)
      setMoreOwnedNftsLoading(false)
    }
  }

  return (
    <div className='ProfilePage'>
      <TopBar />
      <TopBarSpacer />
      <div className="ProfileContainer">
        <div className='ProfileHeader'>
          <div className='ProfilePicWrapper'>
            <img className='ProfilePic NoSelect' src={ defaultPortrait } alt='' />
          </div>
          <div className='ProfileDetailsWrapper'>
            <div className='NicknameWrapper'>
              <div className='Nickname'>Random Citizen</div>
            </div>
            <div className='ProfileAddressWrapper NoSelect' onClick={() => { Clipboard.copyToClipboard(profileAddress) }}>
              Address: { profileAddress }
              <img className='CopyIcon' src={copyIcon} alt='' />
            </div>
            <div className='SocialsWrapper'>
              <a className='SocialNetworkIconWrapper' href={"https://etherscan.io/address/" + profileAddress} target="_blank">
                <img className='SocialNetworkIcon' src={etherscranIcon} alt='' />
              </a>
              {signer !== null && profileAddress === signer.address && <div className='SocialsChangeButton'>
                <img className='CogIcon' src={plusIcon} alt='' />
              </div>}
            </div>
          </div>
        </div>
        <div className='ProfileBody'>
          <div className='ProfileNftsLoaderBar'>
            <div className='LoadedNftsCounter NoSelect'>NFTs loaded: {ownedNfts.length}/{hmNftsOwned}</div>
            {ownedNfts.length < hmNftsOwned && <div className='ProfileLoadMoreNfts NoSelect' onClick={ loadMoreNfts }>Load more</div>}
            {moreOwnedNftsLoading && <img className='LoadingMoreProfileNftsAnimation' src={ loadingAnimation } alt='' />}
          </div>
          <NftList className="NftList" nfts={ ownedNfts } />
          {nftListIsLoading && <img className='NftLoadingAnimation' src={ loadingAnimation } alt='' />}
          {!nftListIsLoading && hmNftsOwned > 100 && <div className='ProfileNftsLoaderBar'>
            <div className='LoadedNftsCounter NoSelect'>NFTs loaded: {ownedNfts.length}/{hmNftsOwned}</div>
            {ownedNfts.length < hmNftsOwned && <div className='ProfileLoadMoreNfts NoSelect' onClick={ loadMoreNfts }>Load more</div>}
            {moreOwnedNftsLoading && <img className='LoadingMoreProfileNftsAnimation' src={ loadingAnimation } alt='' />}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

// KEEP THIS HERE TO USE AS REFERENCE WHEN/IF REINTRODUCING THE SEARCH CAPABILITY FOR THE OWNED NFTS

// import 'react-dropdown/style.css';
// import Dropdown from 'react-dropdown'

// const [searchBarState, setSearchBarState] = useState("")
// const [collectionFilter, setCollectionFilter] = useState(collectionsEmptyFilter)
// const [ownedNftsCollections, setOwnedNftsCollections] = useState([collectionsEmptyFilter])
// const collectionsEmptyFilter = "All Collections"

// determineCollectionFilters()

// useEffect(() => { // Apply search filters
// (async () => {
//         let newNftsToRender = []

//   if(collectionFilter.value === collectionsEmptyFilter || typeof collectionFilter.value === "undefined") {
//     newNftsToRender = nfts
//   } else {
//             nfts.forEach(n => {
//                 if(Nft.determineCollectionNameOfNft(n) === collectionFilter.value) {
//                     newNftsToRender.push(n)
//                 }
//             })
//         }

//         newNftsToRender = newNftsToRender.filter(n => {
//             return (!(searchBarState) ||
//                         (n.contract.openSeaMetadata.collectionName + "").toLowerCase().includes(searchBarState) ||
//                         (n.contract.name + "").toLowerCase().includes(searchBarState) || 
//                         (n.name + "").toLowerCase().includes(searchBarState) || 
//                         (n.tokenId + "").toLowerCase().includes(searchBarState))
//         })

//         setNftsToRender(newNftsToRender)
// })()
// }, [collectionFilter, searchBarState])


// const determineCollectionFilters = () => {
//     setOwnedNftsCollections(Array.from(new Set([collectionsEmptyFilter, ...nfts.map(n => Nft.determineCollectionNameOfNft(n))])))
// }


//             {showCollectionsFilter && <Dropdown options={ ownedNftsCollections } onChange={ setCollectionFilter } value={ collectionsEmptyFilter } placeholder={ collectionsEmptyFilter } />}
//                         {nfts.length !== 0 && <div className='NftListSearchWrapper'>
//             <input className='NftListSearchBar' onChange={ (s) => { setSearchBarState(s.target.value.toLowerCase()) } }></input>
//         </div>}