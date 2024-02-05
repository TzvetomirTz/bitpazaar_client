import './NftList.css'
import MediaSquare from '../MediaSquare/MediaSquare'
import etherIcon from '../../assets/eth_icon.svg'
import { useState, useEffect, useCallback } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import './NftListDropdown.css'
import Nft from '../../services/nft/Nft'

function NftList(props) {
    const { nfts, showCollectionsFilter = true } = props
    const collectionsEmptyFilter = "All Collections"

    const [nftsToRender, setNftsToRender] = useState(nfts)
    const [searchBarState, setSearchBarState] = useState("")
    const [ownedNftsCollections, setOwnedNftsCollections] = useState([collectionsEmptyFilter])
    const [collectionFilter, setCollectionFilter] = useState(collectionsEmptyFilter)

    useEffect(() => {
        (async () => {
            setNftsToRender(nfts)
            determineCollectionFilters()
        })()
    }, [nfts])

    useEffect(() => { // Apply search filters
		(async () => {
            let newNftsToRender = []

			if(collectionFilter.value === collectionsEmptyFilter || typeof collectionFilter.value === "undefined") {
				newNftsToRender = nfts
			} else {
                nfts.forEach(n => {
                    if(Nft.determineCollectionNameOfNft(n) === collectionFilter.value) {
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

    const determineNftPageUrl = (nft) => {
        return '/collections/' + nft.contract.address + '/nft/' + nft.tokenId
    }

    const determineCollectionFilters = () => {
        setOwnedNftsCollections(Array.from(new Set([collectionsEmptyFilter, ...nfts.map(n => Nft.determineCollectionNameOfNft(n))])))
    }

    const renderNfts = () => {
        return nftsToRender.map((n) => {
            return <a className='NftCard' href={ determineNftPageUrl(n) }>
                <div className='NftCardVisualWrapper'>
                    <MediaSquare nft={n} />
                </div>
                <div className='NftCardDetails'>
                    <div className='NftCardName'>{ Nft.determineNameOfNft(n) }</div>
                    <div className='NftCardCollectionName'>
                        { Nft.determineCollectionNameOfNft(n) }
                    </div>
                    <div className='NftCardPriceWrapper'>
                        <div className='NftCardPriceText'>Floor</div>
                        <img className='NftCardEtherIcon' src={ etherIcon } alt='' />
                        <div className='NftCardPrice'>{ Nft.determineNftFloorPrice(n) }</div>
                    </div>
                </div>
            </a>
        })
    }

    return (
        <div className='NftList'>
            {nfts.length !== 0 && <div className='NftListSearchWrapper'>
                {showCollectionsFilter && <Dropdown options={ ownedNftsCollections } onChange={ setCollectionFilter } value={ collectionsEmptyFilter } placeholder={ collectionsEmptyFilter } />}
                <input className='NftListSearchBar' onChange={ (s) => { setSearchBarState(s.target.value.toLowerCase()) } }></input>
            </div>}
            <div className='NftListCardsWrapper'>{ renderNfts() }</div>
        </div>
    )
}

export default NftList