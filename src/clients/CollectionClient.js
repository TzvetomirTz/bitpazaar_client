import axios from 'axios';

const collectionDataLambdaUrl = process.env.REACT_APP_GET_COLLECTION_NFTS_URL;

const getCollectionData = async (contractAddress, accessKey, startToken, limit) => {
    const headers = { "Authorization": "Bearer " + accessKey};
    const params = { contractAddress, startToken, limit };

    let res = await axios.get(collectionDataLambdaUrl, { headers, params }).then((res) => {
        return res;
    }).catch((err) => {
        throw err;
    });

    return res.data.nfts;
}

const CollectionClient = {
    getCollectionData
};

export default CollectionClient;
