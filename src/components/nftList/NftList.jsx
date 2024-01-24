import './NftList.css'
import MediaSquare from '../MediaSquare/MediaSquare'
import etherIcon from '../../assets/eth_icon.svg'
import { useState, useEffect, useCallback } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import './NftListDropdown.css'

function NftList(props) {
    const { nfts } = props
    const collectionsEmptyFilter = "All Collections"

    const [nftsToRender, setNftsToRender] = useState(nfts)
    const [searchBarState, setSearchBarState] = useState("")
    const [ownedNftsCollections, setOwnedNftsCollections] = useState([collectionsEmptyFilter])
    const [collectionFilter, setCollectionFilter] = useState(collectionsEmptyFilter)

    useEffect(() => {
        (async () => {
            setNftsToRender(nfts)
        })()
    }, [nfts])

    useEffect(() => { // Apply search filters
		(async () => {
            let newNftsToRender = []

			if(collectionFilter.value === collectionsEmptyFilter || typeof collectionFilter.value === "undefined") {
				newNftsToRender = nfts
			} else {
                nfts.forEach(n => {
                    if(determineNftCollectionName(n) === collectionFilter.value) {
                        newNftsToRender.push(n)
                    }
                })
            }

            newNftsToRender = newNftsToRender.filter(n => {
                return (!(searchBarState) ||
                            (n.contract.openSeaMetadata.collectionName + "").toLowerCase().includes(searchBarState) ||
                            (n.contract.name + "").toLowerCase().includes(searchBarState) || 
                            (n.name + "").toLowerCase().includes(searchBarState) || 
                            (n.tokenId + "").toLowerCase().includes(searchBarState))
            })

            setNftsToRender(newNftsToRender)
		})()
	}, [collectionFilter, searchBarState])

    const determineNftCollectionName = (nft) => {
        return nft.contract.openSeaMetadata.collectionName !== undefined ?
        nft.contract.openSeaMetadata.collectionName : nft.contract.name
    }

    const determineNftPageUrl = (nft) => {
            return '/collections/' + nft.contract.address + '/nft/' + nft.tokenId
        }

    const renderNfts = () => {
        return nftsToRender.map((n) => {
            const collectionName = determineNftCollectionName(n)
            const nftName = n.name !== undefined ? n.name : collectionName + " #" + n.tokenId

            if (!ownedNftsCollections.includes(collectionName)) {
                setOwnedNftsCollections([...ownedNftsCollections, collectionName])
            }

            // Render starts here
            return <a className='NftCard' href={determineNftPageUrl(n)}>
                <div className='NftCardVisualWrapper'>
                    <MediaSquare nft={n}/>
                </div>
                <div className='NftCardDetails'>
                    <div className='NftCardName'>{ nftName }</div>
                    <div className='NftCardCollectionName'>
                        { collectionName }
                    </div>
                    <div className='NftCardPriceWrapper'>
                        <div className='NftCardPriceText'>Floor</div>
                        <img className='NftCardEtherIcon' src={ etherIcon } alt='' />
                        <div className='NftCardPrice'>{ n.contract.openSeaMetadata.floorPrice }</div>
                    </div>
                </div>
            </a>
        })
    }

    return (
        <div className='NftList'>
            {nfts.length !== 0 && <div className='NftListSearchWrapper'>
                <Dropdown options={ ownedNftsCollections } onChange={ setCollectionFilter } value={ collectionsEmptyFilter } placeholder={ collectionsEmptyFilter } />
                <input className='NftListSearchBar' onChange={ (s) => { setSearchBarState(s.target.value.toLowerCase()) } }></input>
            </div>}
            <div className='NftListCardsWrapper'>{ renderNfts() }</div>
        </div>
    )
}

export default NftList