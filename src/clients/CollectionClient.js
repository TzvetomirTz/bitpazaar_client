import axios from 'axios'

const collectionDataLambdaUrl = process.env.REACT_APP_GET_COLLECTION_NFTS_URL
const searchLambdaUrl = process.env.REACT_APP_SEARCH_URL

const getCollectionData = async (contractAddress, accessKey, startToken, limit) => {
    const headers = { "Authorization": "Bearer " + accessKey}
    const params = { contractAddress, startToken, limit }

    let res = await axios.get(collectionDataLambdaUrl, { headers, params }).then((res) => {
        return res
    }).catch((err) => {
        throw err
    })

    return res.data.nfts
}

const searchForCollections = async (searchStr, accessKey) => {
    const headers = { "Authorization": "Bearer " + accessKey }
    const params = { searchStr }

    let res = await axios.get(searchLambdaUrl, { headers, params }).then((res) => {
        return res
    }).catch((err) => {
        throw err
    })

    return res.data.result
}

const CollectionClient = {
    getCollectionData,
    searchForCollections
};

export default CollectionClient
