import './NftList.css'
import MediaSquare from '../MediaSquare/MediaSquare'
import etherIcon from '../../assets/eth_icon.svg'
import { useState, useEffect, useCallback } from 'react'
import Nft from '../../services/nft/Nft'

function NftList(props) {
    const { nfts } = props
    const [nftsToRender, setNftsToRender] = useState(nfts)

    useEffect(() => {
        (async () => {
            setNftsToRender(nfts)
        })()
    }, [nfts])

    const determineNftPageUrl = (nft) => {
        return '/collections/' + nft.contract.address + '/nft/' + nft.tokenId
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
            <div className='NftListCardsWrapper'>{ renderNfts() }</div>
        </div>
    )
}

export default NftList