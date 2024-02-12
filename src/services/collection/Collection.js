import CollectionClient from "../../clients/CollectionClient"

const getCollectionData = async (contractAddress, accessKey, startToken = 0, limit = 100) => {
    return CollectionClient.getCollectionData(contractAddress, accessKey, startToken, limit)
}

const getCollectionImageUrl = (collection) => {
    return collection.openSeaMetadata.imageUrl
}

const Collection = {
    getCollectionData,
    getCollectionImageUrl
}

export default Collection
