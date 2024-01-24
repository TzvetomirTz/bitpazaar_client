import NftClient from "../../clients/NftClient"

const getNftData = async (collectionAddress, nftId, accessKey) => {
    return NftClient.getNftData(collectionAddress, nftId, accessKey)
}

const Nft = {
    getNftData
}

export default Nft