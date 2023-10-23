import { create } from "zustand";

export const authState = create((set) => ({
	provider: null,
	signer: null,
	walletConnected: false,
	connectWallet: async (newProvider, newSigner) => {
		const newState = {provider: newProvider, signer: newSigner, walletConnected: true };
		set(newState);
		return newState;
	},
	disconnectWallet: async () => {
		const newState = {provider: null, signer: null, walletConnected: false};
		set(newState);
		return newState;
	},
}));
