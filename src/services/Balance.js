import erc20abi from '../assets/erc20Abi.json';
import {ethers} from 'ethers';
const {formatEther} = require("ethers");

const wethAddr = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const abi20 = JSON.stringify(erc20abi);

const getEthBalance = async (provider, signer) => {
    const balance = await provider.getBalance(signer.address);
    return formatEther(balance);
}

const getWethBalance = async (provider, signer) => {
    const contract = new ethers.Contract(wethAddr, abi20, signer);

    try {
        return "" + await contract.balanceOf(signer.address);
    } catch (err) {
        console.log(err);
        return "0";
    }
}

const Balance = {
    getEthBalance,
    getWethBalance
}

export default Balance;
