import erc721Abi from '../../assets/erc721Abi.json';
import { ethers } from 'ethers';

const abi = JSON.stringify(erc721Abi);

const getErc721Name = async (signer, address) => {
    const contract = new ethers.Contract(address, abi, signer)

    return await contract.name();
}

const erc721Adapter = {
    getErc721Name
}

export default erc721Adapter;
