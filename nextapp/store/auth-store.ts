import { deleteToken } from "@/app/actions";
import {  create } from "zustand";
import { ILoginReq } from "@/types/loginReq";
import { loginService, login_res } from "@/services/loginService";
import { ApiRes } from "@/types/ApiRes";
import { devtools, persist ,createJSONStorage} from "zustand/middleware";
import { ISignupReq } from "@/types/ISignupReq";
import { ISignup_res, signupService } from "@/services/signupService";
import { User } from "@/types/user";

interface authStoreProps {
  isLoggedIn: boolean;
  logOut: () => void;
  login: (data: ILoginReq) => Promise<ApiRes<login_res> | undefined>;
  isLoading: boolean;
  checkIsLoggedIn: () => Promise<boolean>;
  signup:(data: ISignupReq) => Promise<ApiRes<ISignup_res> | undefined>,
  user:User | undefined;
}
export const useAuthStore = create<authStoreProps>()(
  devtools(
    persist(
      (set) => ({
        isLoading: false,
        isLoggedIn: false,
        user:undefined,
        login: async (data): Promise<ApiRes<login_res> | undefined> => {
          try {
            set((s) => ({ isLoading: true }));
            const res = await loginService(data);
            if (res?.isSuccess) {
              set(({ isLoggedIn: true }));
              set({user:res.data.user})  
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
            if(window.sessionStorage && window.localStorage){
              try {
                window.sessionStorage.removeItem("accessToken")
              } catch (error) {
                console.error(error)
              }
            }
            set((s) => ({ isLoggedIn: false }));
            set((s) => ({ user: undefined }));
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
        signup:async (data)=>{
          try {
            const res = signupService(data)
            return res
          } catch (error) {
            console.log(error)
          }
        }
      }),
      { name: "authStore", 
      // storage: createJSONStorage(() => sessionStorage),
    }
    )
  )
);
