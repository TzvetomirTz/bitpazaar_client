import './MediaSquare.css'

function MediaSquare(props) {
    const { nft } = props

    if(nft.image.contentType !== undefined) {
        if(nft.image.contentType.startsWith('image')) {
            return <img className='MediaSquare' src={ nft.image.cachedUrl } />
        } else if (nft.image.contentType === 'video/mp4') {
            return <video src={ nft.image.cachedUrl } autoPlay={ true } loop={ true } className='MediaSquare' />
        } else {
            return <div></div>
        }
    } else if(nft.contract.openSeaMetadata !== undefined) {
        const urlResized = nft.contract.openSeaMetadata.imageUrl.includes('=') ? nft.contract.openSeaMetadata.imageUrl.split('=')[0] + '=s200' : nft.contract.openSeaMetadata.imageUrl

        return <img className='MediaSquare' src={ urlResized } />
    } else {
        return <div className='MediaSquare'></div>
    }
}

export default MediaSquare