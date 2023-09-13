import { create } from "zustand";

const authState = create((set) => ({
	provider: null,
  signer: null,
	walletAddr: null,
  setProvider: () => set((newProvider) => ({ provider: newProvider })),
  setSigner: () => set((newSigner) => ({ signer: newSigner })),
	signOut: () => set({ provider: null, signer: null, walletAddr: null }),
}));

export default authState;
