import { storeToken } from "@/app/actions";
import axiosInstance from "@/constants/axiosInstance";
import { ApiRes } from "@/types/ApiRes";
import { ILoginReq } from "@/types/loginReq";
import { cache } from "react";

interface login_res {
  accessToken: string;
  message: string;
}

export const loginService = cache(async (data: ILoginReq) => {
  try {
    const res = await axiosInstance.post<ApiRes<login_res>>("/user/login", data);
    if(res.data.isSuccess){
      await storeToken({ token: res.data.data.accessToken });
    }
    return res.data;
  } catch (error) {
    console.log(error)
  }
});