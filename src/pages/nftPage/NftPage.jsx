import './NftPage.css'
import TopBar from '../../components/topBar/TopBar'
import TopBarSpacer from '../../components/spacer/TopBarSpacer'
import Authentication from '../../services/Authentication'
import { authState } from '../../state/AuthState'
import { useParams } from 'react-router-dom'
import Nft from '../../services/nft/Nft'
import React, { useState } from 'react'

function NftPage() {
	const { collectionAddress, nftId } = useParams()
	const [nftData, setNftData] = useState({})
	const [nftDataIsLoading, setNftDataIsLoading] = useState(false)
	const accessKey = authState((state) => state.accessKey)
	const stateConnectWallet = authState((state) => state.connectWallet)
	const authenticatedToBackend = authState((state) => state.authenticatedToBackend)
	const authenticateToBackend = authState((state) => state.authenticateToBackend)

	Authentication.tryToContinueSessionIfNeeded(authenticatedToBackend, stateConnectWallet, authenticateToBackend)

	React.useEffect(() => {
		(async () => {
		  if(authenticatedToBackend) {
			loadNftData()
		  }
		})()
	  }, [authenticatedToBackend, collectionAddress, nftId])

	const loadNftData = async () => {
		setNftDataIsLoading(true)
		setNftData(await Nft.getNftData(collectionAddress, nftId, accessKey))
		console.log(JSON.stringify(await Nft.getNftData(collectionAddress, nftId, accessKey)));
		setNftDataIsLoading(false)
	}

	return (
		<div className='NftPage'>
			<TopBar />
			<TopBarSpacer />
			{!nftDataIsLoading && <div className='NftDataWrapper'>
				{nftData.tokenId}
			</div>}
		</div>
	)
}

export default NftPage