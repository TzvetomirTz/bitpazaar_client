const {utils, BigNumber, formatEther} = require("ethers") ;

const getEthBalance = async (provider, signer) => {
    const balance = await provider.getBalance(signer.address);
    return formatEther(balance);
}

const Balance = {
    getEthBalance
}

export default Balance;
