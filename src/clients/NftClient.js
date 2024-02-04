import axios from 'axios';

const nftDataLambdaUrl = process.env.REACT_APP_GET_NFT_DATA_URL;
const nftRarityLambdaUrl = process.env.REACT_APP_GET_NFT_RARITY_URL;

const getNftData = async (contractAddress, tokenId, accessKey) => {
    const headers = { "Authorization": "Bearer " + accessKey};
    const params = { contractAddress, tokenId };

    let res = await axios.get(nftDataLambdaUrl, { headers, params }).then((res) => {
        return res;
    }).catch((err) => {
        throw err;
    });

    return res.data.nftData;
}

const getNftRarity = async (contractAddress, tokenId, accessKey) => {
    const headers = { "Authorization": "Bearer " + accessKey};
    const params = { contractAddress, tokenId };

    let res = await axios.get(nftRarityLambdaUrl, { headers, params }).then((res) => {
        return res;
    }).catch((err) => {
        throw err;
    });

    return res.data.rarities;
}

const NftClient = {
    getNftData,
    getNftRarity
};

export default NftClient;
