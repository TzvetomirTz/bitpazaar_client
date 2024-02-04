import './NftPage.css'
import TopBar from '../../components/topBar/TopBar'
import TopBarSpacer from '../../components/spacer/TopBarSpacer'
import Authentication from '../../services/Authentication'
import { authState } from '../../state/AuthState'
import { useParams } from 'react-router-dom'
import Nft from '../../services/nft/Nft'
import React, { useState } from 'react'
import MediaSquare from '../../components/MediaSquare/MediaSquare'

function NftPage() { // ToDo: Find a way to parameterize the render of this page and if possible skip lambda call when redir from collection
	const { collectionAddress, nftId } = useParams()
	const [nftData, setNftData] = useState({})
	const [nftRarity, setNftRarity] = useState([])
	const [nftDataIsLoading, setNftDataIsLoading] = useState(false)
	const [nftRarityIsLoading, setNftRarityIsLoading] = useState(true)
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
		setNftData(await Nft.getNftData(collectionAddress, nftId, accessKey)) // Use the optional to set the loading to false
		setNftDataIsLoading(false)

		setNftRarityIsLoading(true)
		setNftRarity(await Nft.getNftRarity(collectionAddress, nftId, accessKey)) // Use the optional to set the loading to false
		setNftRarityIsLoading(false)

		console.log(JSON.stringify(nftRarity))
	}

	const determineOwnerProfileUrl = () => {
		return "/profile/" + Nft.determineNftOwner(nftData)
	}

	return (
		<div className='NftPage'>
			<TopBar />
			<TopBarSpacer />
			{!nftDataIsLoading && Object.keys(nftData).length !== 0 && <div className='NftDataWrapper'>
				<div className='NftPageVisualWrapper'>
					<MediaSquare className="NftPageVisual" nft={ nftData } resizePxIfPossible={ 2000 } />
				</div>
				<div className='NftPageDetailsWrapper'>
					<div className='NftPageNftName'>{ Nft.determineNameOfNft(nftData) }</div>
					<div className='NftPageNftCollectionNameOuterWrapper'>
						<a className='NftPageNftCollectionNameWrapper' href='whatever.com'>
							<div className='NftPageNftCollectionName'>{ Nft.determineCollectionNameOfNft(nftData) }</div>
							<div className='NftPageNftCollectionTotalSupply'>Total supply: { Nft.determineTotalSupplyOfNftCollection(nftData) }</div>
						</a>
					</div>
					<a className='NftPageNftOwnerWrapper' href={ determineOwnerProfileUrl() }>
						Owned by: { Nft.determineNftOwner(nftData) }
					</a>
					<div className='NftPageNftFloorPriceWrapper'>Floor Price: { Nft.determineNftFloorPrice(nftData) }</div>
					<div className='NftPageAskBidWrapper'>
						<div className="NftPageAskButton NoSelect">Current Price: 1 WETH</div>
						<div className="NftPageBidButton NoSelect">Current Bid: 0.8 WETH</div>
					</div>
				</div>
			</div>}
			{!nftRarityIsLoading && <div className='NftPageRarityWrapper'>
				<div className='NftPageRarity'>
					<div className='NftPageRarityTitle'>Rarity Attributes</div>
					<div className='NftPageRarityAttributesWrapper'>
						{nftRarity.map((a) => {
							return <div className='NftPageRarityAttribute'>
								<div className='NftPageRarityAttributeType'>{ a.traitType }</div>
								<div className='NftPageRarityAttributeValue'>{ a.value }</div>
								<div className='NftPageRarityAttributePrevalence'>{ (a.prevalence * 100).toFixed(2) } %</div>
							</div>
						})}
					</div>
				</div>
			</div>}
		</div>
	)
}

export default NftPage
