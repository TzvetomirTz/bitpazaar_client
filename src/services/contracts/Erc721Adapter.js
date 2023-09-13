import erc721Abi from '../../assets/erc721Abi.json';
import web3 from 'web3';
import { ethers } from 'ethers';

const abi = JSON.stringify(erc721Abi);

const getErc721Name = (address) => {
    // decisionRoomContract.current = new ethers.Contract(address, abi, signer.current)
    return "asdf";
}

const erc721Adapter = {
    getErc721Name
}

export default erc721Adapter;
