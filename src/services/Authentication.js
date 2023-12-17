import axios from 'axios';
const { ethers } = require("ethers");

const authLambdaUrl = process.env.REACT_APP_AUTH_URL;

const connectWallet = async (stateConnectWallet) => {
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
			let signer = null;

			signer = await provider.getSigner();
			await stateConnectWallet(provider, signer);
}

const authenticate = async (provider, signer) => {
    const domain = {
        name: 'BitPazaar',
        chainId: (await provider.getNetwork()).chainId
    };

    const types = {
        Auth: [
            { name: 'wltAddr', type: 'address' },
            { name: 'action', type: 'string' },
            { name: 'ogTs', type: 'uint256'}
        ]
    };

    const authPayload = {
        wltAddr: await signer.getAddress(),
        action: 'auth',
        ogTs: new Date().getTime()
    };

    const signature = await signer.signTypedData(domain, types, authPayload);

    console.log(signature);
    console.log(authLambdaUrl);
    console.log(JSON.stringify({...authPayload, signature}));

    // const res = await axios.get("https://www.google.com/");
    // const axiosInstance = axios.create({baseURL: authLambdaUrl});
    let res = await axios.get(authLambdaUrl, {params: {...authPayload, signature}}).then((res) => {
        console.log("Got res: " + JSON.stringify(res));
    }).catch((err) => {
        console.log(err)
    });

    console.log(JSON.stringify(res));

    return "__ACCESS_KEY__";
}


const Authentication = {
    connectWallet,
    authenticate
}

export default Authentication;
