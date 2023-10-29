
const authenticate = async (provider, signer) => {
    const domain = {
        name: 'BitPazaar Login',
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
        action: 'auth',
        app: 'BitPazaar'
      };
  
      const signature = await signer.signTypedData(domain, types, authPayload);
  
      console.log(signature);
  
    //   const recoveredAddress = ethers.verifyTypedData(domain, types, authPayload, signature); // The good stuff
}


const Authentication = {
    authenticate
}

export default Authentication;
