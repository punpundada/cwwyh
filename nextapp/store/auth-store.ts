import { deleteToken } from "@/app/actions";
import {  create } from "zustand";
import { ILoginReq } from "@/types/loginReq";
import { loginService, login_res } from "@/services/loginService";
import { ApiRes } from "@/types/ApiRes";
import { devtools, persist ,createJSONStorage} from "zustand/middleware";

interface authStoreProps {
  isLoggedIn: boolean;
  logOut: () => void;
  login: (data: ILoginReq) => Promise<ApiRes<login_res> | undefined>;
  isLoading: boolean;
  checkIsLoggedIn: () => Promise<boolean>;
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
        checkIsLoggedIn: async () => {
          try {
            const res = await fetch("/api/auth/token");
            const resData = await res.json();
            return !!resData?.token;
          } catch (e) {
            console.log(e);
            return false;
          }
        },
      }),
      { name: "authStore", 
      storage: createJSONStorage(() => sessionStorage),
    }
    )
  )
);
