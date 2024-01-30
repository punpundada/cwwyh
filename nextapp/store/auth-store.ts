import { deleteToken } from "@/app/actions";
import { cookies } from "next/headers";
import { Mutate, StoreApi, UseBoundStore, create } from "zustand";
import { redirect } from "next/navigation";
import { ILoginReq } from "@/types/loginReq";
import { loginService, login_res } from "@/services/loginService";
import { ApiRes } from "@/types/ApiRes";
import { devtools, persist } from "zustand/middleware";

interface authStoreProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (x: boolean) => void;
  logOut: () => void;
  login: (data: ILoginReq) => Promise<ApiRes<login_res> | undefined>;
  isLoading: boolean;
}
export const useAuthStore = create<authStoreProps>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        isLoggedIn: false,
        login: async (data): Promise<ApiRes<login_res> | undefined> => {
          try {
            set((s) => ({ isLoading: true }));
            const res = await loginService(data);
            if (res?.isSuccess) {
              set((s) => ({ isLoggedIn: true }));
            }
            set((s) => ({ isLoading: false }));
            return res;
          } catch (error) {
            set((s) => ({ isLoading: false }));
            console.log(error);
            return undefined;
          }
        },
        logOut: async () => {
          try {
            await deleteToken();
            set((s) => ({ isLoggedIn: false }));
          } catch (error) {
            console.log(error);
          }
        },
        setIsLoggedIn: (x) => set((state) => ({ isLoggedIn: x })),
      }),
      { name: "authStore" }
    )
  )
);

/*
(set) => 
   ({
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
  login: async (data):Promise<ApiRes<login_res> | undefined> => {
    try {
      set((s) => ({ isLoading: true }));
      const res = await loginService(data);
      if (res?.isSuccess) {
        set((s) => ({ isLoggedIn: true }));
      }
      set((s) => ({ isLoading: false }));
      return res
    } catch (error) {
      set((s) => ({ isLoading: false }));
      console.log(error);
      return undefined
    }
  },
  isLoading: false,
})
*/
