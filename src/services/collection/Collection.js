import CollectionClient from "../../clients/CollectionClient"

const getCollectionData = async (contractAddress, accessKey, startToken = 0, limit = 100) => {
    return CollectionClient.getCollectionData(contractAddress, accessKey, startToken, limit)
}

const Collection = {
    getCollectionData
}

export default Collection
