import { deleteToken } from "@/app/actions";
import { cookies } from "next/headers";
import { create } from "zustand";
import { redirect } from "next/navigation";

interface authStoreProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (x: boolean) => void;
  logOut: () => void;
}

export const authStore = create<authStoreProps>()((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (x) => set((state) => ({ isLoggedIn: x })),
  logOut: async () => {
    try {
      await deleteToken();
      set((s) => ({ isLoggedIn: false }));
    } catch (error) {
      console.log(error);
    }
  },
}));
