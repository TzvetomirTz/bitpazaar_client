const { ethers } = require('ethers')
const AuthClient = require('../clients/AuthClient').default

const connectWallet = async (stateConnectWallet) => {
    const provider = new ethers.BrowserProvider(window.ethereum, "any")
			let signer = null

			signer = await provider.getSigner()
			await stateConnectWallet(provider, signer)
}

const generateAcsToken = async (provider, signer) => {
    const domain = {
        name: 'BitPazaar',
        chainId: (await provider.getNetwork()).chainId
    }

    const types = {
        Auth: [
            { name: 'wltAddr', type: 'address' },
            { name: 'action', type: 'string' },
            { name: 'ogTs', type: 'uint256'}
        ]
    }

    const ogTs = new Date().getTime()
    const action = 'auth'
    const wltAddr = await signer.getAddress()

    const authPayload = {
        wltAddr,
        action,
        ogTs
    }

    try {
        const signature = await signer.signTypedData(domain, types, authPayload)
        return await AuthClient.getAcsToken(wltAddr, action, ogTs, signature)
    } catch (exception) {
        return ""
    }
}

const Authentication = {
    connectWallet,
    generateAcsToken
}

export default Authentication
