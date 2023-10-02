import erc721Abi from '../../assets/erc721Abi.json';
import { ethers } from 'ethers';

const abi721 = JSON.stringify(erc721Abi);

const getErc721Name = async (signer, address) => {
    const contract = new ethers.Contract(address, abi721, signer);

    try {
        return await contract.name();
    } catch (err) {
        // ToDo: Handle the case when address is not an ERC721.
        return "";
    }
}

const erc721Adapter = {
    getErc721Name
}

export default erc721Adapter;
