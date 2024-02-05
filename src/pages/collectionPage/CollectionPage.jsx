import './CollectionPage.css'
import TopBar from '../../components/topBar/TopBar'
import TopBarSpacer from '../../components/spacer/TopBarSpacer'
import Authentication from '../../services/Authentication'
import { authState } from '../../state/AuthState'
import React, { useState } from 'react'
import Collection from '../../services/collection/Collection'
import { useParams } from 'react-router-dom'
import NftList from '../../components/nftList/NftList'

function CollectionPage() {
    const { collectionAddress } = useParams()
	const stateConnectWallet = authState((state) => state.connectWallet)
	const authenticatedToBackend = authState((state) => state.authenticatedToBackend)
	const authenticateToBackend = authState((state) => state.authenticateToBackend)
	const accessKey = authState((state) => state.accessKey)
	const [collectionData, setCollectionData] = useState([])
	const [collectionDataIsLoading, setCollectionDataIsLoading] = useState(true)

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
        Collection.getCollectionData(collectionAddress, accessKey).then((res) => {
            setCollectionData(res)
            setCollectionDataIsLoading(false)
        })
    }

    return (
        <div className='CollectionPage'>
            <TopBar />
            <TopBarSpacer />

            {!collectionDataIsLoading && <div className='CollectionWrapper'>
                <div className='CollectionPageBannerWrapper'>
                    <img className='CollectionPageBanner' src={ collectionData[0].collection.bannerImageUrl } />
                </div>
                <div className='CollectionPageTitle'>Collection Title</div>
                <NftList className="NftList" nfts={ collectionData } showCollectionsFilter={false} />
            </div>}
        </div>
    )
}

export default CollectionPage
