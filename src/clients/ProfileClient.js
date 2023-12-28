import axios from 'axios';

const getNftsByOwnerLambdaUrl = process.env.REACT_APP_GET_NFTS_BY_OWNER_URL;

const getNftsByOwner = async (accessKey, address) => {
    const headers = { "Authorization": "Bearer " + accessKey};
    const params = { address };

    let res = await axios.get(getNftsByOwnerLambdaUrl, { headers, params }).then((res) => {
        return res;
    }).catch((err) => {
        throw err;
    });

    return res.data;
}

const ProfileClient = {
    getNftsByOwner
};

export default ProfileClient;
