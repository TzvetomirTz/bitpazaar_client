import axios from 'axios';

const authLambdaUrl = process.env.REACT_APP_AUTH_URL;

const getAcsToken = async (wltAddr, action, ogTs, signature) => {
    const params = { wltAddr, action, ogTs, signature };

    let res = await axios.get(authLambdaUrl, { params }).then((res) => {
        console.log("Got rez: " + JSON.stringify(res));
        return res;
    }).catch((err) => {
        console.log(err)
    });

    return res.data.acsToken;
}

const AuthClient = {
    getAcsToken
};

export default AuthClient;