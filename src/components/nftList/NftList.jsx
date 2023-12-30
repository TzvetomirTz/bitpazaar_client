import './NftList.css'

function NftList(props) {
    const { nfts, separateByCollection } = props

    const renderNfts = () => {
        let elemnents = []
        let currentCollection = ""

        nfts.map((n) => {
            if(separateByCollection && currentCollection !== n.collection.name) {
                elemnents.push(<div className='CollectionTitle'>
                    {n.collection.name}
                </div>)

                currentCollection = n.collection.name
            }

            elemnents.push(
            <div className='NtfWrapper'>
                <div className='NftThumbnail'></div>
                {!separateByCollection && <div className='NftCollectionName'>{n.collection.name}</div>}
                <div className='NftId'>{n.tokenId}</div>
            </div>)
        });

        return elemnents
    };

    return (
        <div className='NftList'>
            { renderNfts() }
        </div>
    );
}

export default NftList