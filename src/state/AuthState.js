import { create } from "zustand";

export const authState = create((set) => ({
	signer: null,
	setSigner: (newSigner) => set({ signer: newSigner }),
}));
