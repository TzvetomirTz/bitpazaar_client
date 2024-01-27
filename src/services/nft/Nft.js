import NftClient from "../../clients/NftClient"

const getNftData = async (collectionAddress, nftId, accessKey) => {
    return NftClient.getNftData(collectionAddress, nftId, accessKey)
}

const determineCollectionNameOfNft = (nft) => { // Don't ever make this async, it would break a couple of renders
    return nft.contract.openSeaMetadata.collectionName !== undefined ?
    nft.contract.openSeaMetadata.collectionName : nft.contract.name
}

const determineNameOfNft = (nft) => { // Don't ever make this async, it would break a couple of renders
    return nft.name !== undefined ? nft.name : determineCollectionNameOfNft(nft) + " #" + nft.tokenId
}

const determineTotalSupplyOfNftCollection = (nft) => {
    return nft.contract.totalSupply
}

const determineNftOwner = (nft) => {
    return nft.owners[0]
}

const determineNftFloorPrice = (nft) => {
    return nft.contract.openSeaMetadata.floorPrice || "--.--"
}

const Nft = {
    determineTotalSupplyOfNftCollection,
    determineCollectionNameOfNft,
    determineNftFloorPrice,
    determineNameOfNft,
    determineNftOwner,
    getNftData
}

export default Nft
