import axios from 'axios'

const collectionDataLambdaUrl = process.env.REACT_APP_GET_COLLECTION_NFTS_URL
const searchLambdaUrl = process.env.REACT_APP_SEARCH_URL

const getCollectionNftsPage = async (contractAddress, accessKey, pageKey) => {
    const headers = { "Authorization": "Bearer " + accessKey}
    const params = { contractAddress, pageKey }

    let page = await axios.get(collectionDataLambdaUrl, { headers, params }).then((res) => {
        return res.data.collectionPage
    }).catch((err) => {
        throw err
    })

    return page
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
    getCollectionNftsPage,
    searchForCollections
};

export default CollectionClient
