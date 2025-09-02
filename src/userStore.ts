import { create } from "zustand";
import type { userDataType } from "./types";

interface UserState {
    currentUser: userDataType | null
    setCurrentUser: (user: userDataType | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null, // El estado inicial es `null` porque no hay nadie logueado.
  setCurrentUser: (user) => set({ currentUser: user }), // Acción para actualizar el usuario.
}));