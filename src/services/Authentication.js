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
          { name: 'walletAddress', type: 'address' },
          { name: 'action', type: 'string' }
        ]
      };

      const authPayload = {
        walletAddress: await signer.getAddress(),
        action: 'auth'
      };

      const signature = await signer.signTypedData(domain, types, authPayload);

      console.log(signature);
      console.log(authLambdaUrl);

    //   const recoveredAddress = ethers.verifyTypedData(domain, types, authPayload, signature); // The good stuff
    return "__ACCESS_KEY__";
}


const Authentication = {
    connectWallet,
    authenticate
}

export default Authentication;
