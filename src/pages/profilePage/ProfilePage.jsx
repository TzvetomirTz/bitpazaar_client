import './ProfilePage.css'
import TopBar from "../../components/topBar/TopBar"
import TopBarSpacer from '../../components/spacer/TopBarSpacer'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileClient from '../../clients/ProfileClient'
import { authState } from '../../state/AuthState'
import NftList from '../../components/nftList/NftList'

function ProfilePage() {
  const { profileAddress } = useParams()
  const walletConnected = authState((state) => state.walletConnected)
  const accessKey = authState((state) => state.accessKey)
  const [hmNftsOwned, setHmNftsOwned] = useState(0)
  const [ownedNfts, setOwnedNfts] = useState([])

  React.useEffect(() => {
    (async () => {
      if(walletConnected) {
        loadProfileNfts()
      }
    })()
  }, [])

  const loadProfileNfts = async () => {
    const nftData = await ProfileClient.getNftsByOwner(accessKey, "0x300e31AAF34aB0327Eaf6624C543Dbe19f44bbd3") // ToDo: replace addr
    setHmNftsOwned(nftData.nftsCount)
    setOwnedNfts(nftData.nfts)
  }

  return (
    <div className='ProfilePage'>
      <TopBar />
      <TopBarSpacer />
      <div className="ProfileContainer">
        <div className='ProfileHeader'>
          <div className='ProfilePic'></div>
          <div className='ProfileAddress'>{ profileAddress }</div>
        </div>
        <div className='ProfileBody'>
          <div className='ProfileSectionTitle'>NFTS ({ hmNftsOwned }):</div>
          <NftList className="NftList" nfts={ ownedNfts } separateByCollection={true} />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
