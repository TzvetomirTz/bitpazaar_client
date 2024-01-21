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

function ProfilePage() {
  const { profileAddress } = useParams()
  const walletConnected = authState((state) => state.walletConnected)
  const accessKey = authState((state) => state.accessKey)
  const [hmNftsOwned, setHmNftsOwned] = useState(0)
  const [ownedNfts, setOwnedNfts] = useState([])
  const signer = authState((state) => state.signer)
  const [nftListIsLoading, setNftListIsLoading] = useState(false);

  React.useEffect(() => {
    (async () => {
      if(walletConnected) {
        loadProfileNfts()
      }
    })()
  }, [])

  const loadProfileNfts = async () => {
    setNftListIsLoading(true)

    const nftData = await ProfileClient.getNftsByOwner(accessKey, "0x300e31AAF34aB0327Eaf6624C543Dbe19f44bbd3") // ToDo: replace addr
    setHmNftsOwned(nftData.nftsCount)
    setOwnedNfts(nftData.nfts)

    setNftListIsLoading(false)
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
              <div className='Nickname'>DEFAULT_DADDY</div>
            </div>
            <div className='ProfileAddressWrapper NoSelect' onClick={() => {Clipboard.copyToClipboard(profileAddress)}}>
              Address: { profileAddress }
              <img className='CopyIcon' src={copyIcon} alt='' />
            </div>
            <div className='SocialsWrapper'>
              <a className='SocialNetworkIconWrapper' href={"https://etherscan.io/address/" + profileAddress} target="_blank">
                <img className='SocialNetworkIcon' src={etherscranIcon} alt='' />
              </a>
              {signer !== null && profileAddress === signer.address && <div className='SocialsChangeButton'>
                <img className='CogIcon' src={plusIcon} alt='' />
              </div>
              }
            </div>
          </div>
        </div>
        <div className='ProfileBody'>
          {nftListIsLoading && <img className='NftLoadingAnimation' src={loadingAnimation} alt='' />}
          <NftList className="NftList" nfts={ ownedNfts } separateByCollection={true} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
