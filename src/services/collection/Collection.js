import CollectionClient from "../../clients/CollectionClient"

const getCollectionNftsPage = async (contractAddress, accessKey, pageKey) => {
    return CollectionClient.getCollectionNftsPage(contractAddress, accessKey, pageKey)
}

const getCollectionImageUrl = (collection) => {
    return collection.openSeaMetadata.imageUrl
}

const Collection = {
    getCollectionNftsPage,
    getCollectionImageUrl
}

export default Collection
