import './NftList.css';

function NftList(props) {
    const { nfts } = props;

    const renderNfts = () => {
        return nfts.map((n) => {
            return <div className='NtfWrapper'>
                <div className='NftThumbnail'></div>
                <div className='NftCollectionName'>{n.collection.name}</div>
                <div className='NftId'>{n.tokenId}</div>
            </div>});
    };

    return (
        <div className='NftList'>
            { renderNfts() }
        </div>
    );
}

export default NftList;