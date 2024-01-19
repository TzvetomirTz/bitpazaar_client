import './NftList.css'
import MediaSquare from '../MediaSquare/MediaSquare'

function NftList(props) {
    const { nfts } = props

    const renderNfts = () => {
        return nfts.map((n) => {
            const collectionName = n.contract.openSeaMetadata.collectionName !== undefined ?
            n.contract.openSeaMetadata.collectionName : n.contract.name
            const nftName = n.name !== undefined ? n.name : collectionName + " #" + n.tokenId
        
            return <div className='NftCard'>
            <div className='NftCardVisualWrapper'>
                <MediaSquare nft={n}/>
            </div>
            <div className='NftCardDetails'>
                <div className='NftCardName'>{ nftName }</div>
                <div className='NftCardCollectionName'>
                    { collectionName }
                </div>
            </div>
        </div>})
    }

    return (
        <div className='NftList'>
            { renderNfts() }
        </div>
    )
}

export default NftList