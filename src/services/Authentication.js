import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode"
const { ethers } = require('ethers')
const AuthClient = require('../clients/AuthClient').default

const cookies = new Cookies(null, { path: '/' })
const ACCESS_TOKEN_COOKIE_NAME = 'acsTkn'

const connectWallet = async (stateConnectWallet) => {
    const provider = new ethers.BrowserProvider(window.ethereum, "any")
    let signer = null

    signer = await provider.getSigner()
    await stateConnectWallet(provider, signer)
}

const generateAcsToken = async (provider, signer, walletName) => {
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
        const acsToken = await AuthClient.getAcsToken(wltAddr, action, ogTs, signature)
        setAccessCookie(acsToken, walletName)

        return acsToken
    } catch (exception) {
        console.log(exception);
        return ""
    }
}

const setAccessCookie = (acsToken, walletName) => {
    cookies.set(ACCESS_TOKEN_COOKIE_NAME,
        JSON.stringify({
            acsToken, walletName
        }),
        {
            expires: new Date(jwtDecode(acsToken).endDate)
        })
}

const tryToContinueSessionIfNeeded = async (authenticatedToBackend, stateConnectWallet, authenticateToBackend) => {
    if(!authenticatedToBackend) {
        const acsToken = cookies.get(ACCESS_TOKEN_COOKIE_NAME).acsToken

        await connectWallet(stateConnectWallet)
        await authenticateToBackend(acsToken)

    }
}

const Authentication = {
    connectWallet,
    generateAcsToken,
    tryToContinueSessionIfNeeded
}

export default Authentication
