import './NftList.css'

function NftList(props) {
    const { nfts, separateByCollection } = props

    const renderNfts = () => {
        let elemnents = []
        let collections = {}
        
        nfts.map((n) => {
            if(collections[n.collection.name] === undefined) { collections[n.collection.name] = [] }
            collections[n.collection.name].push(n)
        })

        Object.keys(collections).map((c) => {
            elemnents.push(<div className='CollectionWrapper'>
                <div className='CollectionTitle'>{c}</div>
                <div className='CollectionNftsWrapper'>
                    {collections[c].map((n) => {
                        return <div className='NtfWrapper'>
                            <img className='NftThumbnail' src={n.image.cachedUrl}></img>
                        <div className='NftId'>{n.tokenId}</div>
                    </div>
                    })}
                </div>
            </div>)
        })

        return elemnents
    }

    return (
        <div className='NftList'>
            { renderNfts() }
        </div>
    )
}

export default NftList