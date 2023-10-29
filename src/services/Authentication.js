const { ethers } = require("ethers");

const connectWallet = async (stateConnectWallet) => {
    const provider = new ethers.BrowserProvider(window.ethereum, "any");
			let signer = null;

			signer = await provider.getSigner();
			await stateConnectWallet(provider, signer);
}

const authenticate = async (provider, signer) => {
    const domain = {
        name: 'BitPazaar',
        version: '1.0.0',
        chainId: (await provider.getNetwork()).chainId
      };
  
      const types = {
        Auth: [
          { name: 'signer', type: 'address' },
          { name: 'app', type: 'string' },
          { name: 'action', type: 'string' }
        ]
      };
  
      const authPayload = {
        signer: await signer.getAddress(),
        action: 'auth'
      };
  
      const signature = await signer.signTypedData(domain, types, authPayload);
  
      console.log(signature);
  
    //   const recoveredAddress = ethers.verifyTypedData(domain, types, authPayload, signature); // The good stuff
}


const Authentication = {
    connectWallet,
    authenticate
}

export default Authentication;
