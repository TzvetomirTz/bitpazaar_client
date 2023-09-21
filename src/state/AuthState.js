import { create } from "zustand";

export const authState = create((set) => ({
	provider: null,
	signer: null,
	connected: false,
	connectWallet: (newProvider, newSigner) => set({provider: newProvider, signer: newSigner, connected: true }),
	disconnectWallet: () => set({provider: null, signer: null, connected: false}),
}));
