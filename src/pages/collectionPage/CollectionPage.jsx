import './CollectionPage.css'
import TopBar from '../../components/topBar/TopBar'
import TopBarSpacer from '../../components/spacer/TopBarSpacer'
import Authentication from '../../services/Authentication'
import { authState } from '../../state/AuthState'
import React, { useState } from 'react'
import Collection from '../../services/collection/Collection'
import { useParams } from 'react-router-dom'
import NftList from '../../components/nftList/NftList'
import loadingAnimation from '../../assets/animations/loading_animation.gif'

function CollectionPage() {
    const { collectionAddress } = useParams()
	const stateConnectWallet = authState((state) => state.connectWallet)
	const authenticatedToBackend = authState((state) => state.authenticatedToBackend)
	const authenticateToBackend = authState((state) => state.authenticateToBackend)
	const accessKey = authState((state) => state.accessKey)
	const [collectionData, setCollectionData] = useState([])
	const [collectionDataIsLoading, setCollectionDataIsLoading] = useState(true)
    const [pageKey, setPageKey] = useState(null)
    const [isLoadingMoreCollectionNfts, setIsLoadingMoreCollectionNfts] = useState(false)

	Authentication.tryToContinueSessionIfNeeded(authenticatedToBackend, stateConnectWallet, authenticateToBackend)

    React.useEffect(() => {
		(async () => {
		  if(authenticatedToBackend) {
			loadCollectionData()
		  }
		})()
    }, [authenticatedToBackend, collectionAddress])

    const loadCollectionData = async () => {
        setCollectionDataIsLoading(true)
        Collection.getCollectionNftsPage(collectionAddress, accessKey).then((res) => {
            setCollectionData(res.nfts)
            setPageKey(res.pageKey)
            setCollectionDataIsLoading(false)
        })
    }

    const loadMoreCollectionNfts = async () => {
        setIsLoadingMoreCollectionNfts(true)

        Collection.getCollectionNftsPage(collectionAddress, accessKey, pageKey).then((res) => {
            setCollectionData([...collectionData, ...res.nfts])
            setPageKey(res.pageKey)
            setIsLoadingMoreCollectionNfts(false)
        })
    }

    return (
        <div className='CollectionPage'>
            <TopBar />
            <TopBarSpacer />

            {!collectionDataIsLoading && <div className='CollectionWrapper'>
                <div className='CollectionPageBannerWrapper'>
                    <img className='CollectionPageBanner' src={ collectionData[0].collection.bannerImageUrl } alt='' />
                </div>
                <div className='CollectionPageTitle'>{ collectionData[0].collection.name }</div>
                <NftList className="NftList" nfts={ collectionData } showCollectionsFilter={ false } />
                <div className='CollectionPageLoadMoreNftsBottomBar'>
                    {!isLoadingMoreCollectionNfts && <div className='CollectionPageLoadMoreNfts NoSelect' onClick={ loadMoreCollectionNfts }>Load More NFTs</div>}
                    {isLoadingMoreCollectionNfts && <img className='CollectionPageLoadingAnimation' src={ loadingAnimation } alt='' />}
                </div>
            </div>}
        </div>
    )
}

export default CollectionPage
