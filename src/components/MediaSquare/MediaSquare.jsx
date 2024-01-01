import './MediaSquare.css'

function MediaSquare(props) {
    const { nft } = props

    const displayThumbnail = () => {
        if(nft.image.contentType !== undefined) {
            if(nft.image.contentType.startsWith('image')) {
                return <img className='Thumbnail' src={ nft.image.cachedUrl } />
            } else if (nft.image.contentType === 'video/mp4') {
                return <video src={ nft.image.cachedUrl } autoPlay={ true } className='Thumbnail' />
            } else {
                return <div></div>
            }
        } else if(nft.contract.openSeaMetadata !== undefined) {
            const urlResized = nft.contract.openSeaMetadata.imageUrl.includes('=') ? nft.contract.openSeaMetadata.imageUrl.split('=')[0] + '=s200' : nft.contract.openSeaMetadata.imageUrl

            return <img className='Thumbnail' src={ urlResized } />
        } else {
            return <div></div>
        }
    }

    return (
        <div className='MediaSquare'>
            { displayThumbnail() }
        </div>
    )
}

export default MediaSquare