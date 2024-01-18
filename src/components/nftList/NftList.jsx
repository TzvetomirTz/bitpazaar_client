import './NftList.css'
import MediaSquare from '../MediaSquare/MediaSquare'

function NftList(props) {
    const { nfts } = props

    const renderNfts = () => {
        return nfts.map((n) => <div className='NftCard'>
            
        </div>)
    }

    return (
        <div className='NftList'>
            { renderNfts() }
        </div>
    )
}

export default NftList