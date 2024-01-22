import { storeToken } from "@/app/actions";
import axiosInstance from "@/constants/axiosInstance";
import { ApiRes } from "@/types/ApiRes";
import { ILoginReq } from "@/types/loginReq";
import { cache } from "react";

interface login_res {
  accessToken: string;
  message: string;
}

export const loginService = cache(async(data: ILoginReq) => {
  const res = await axiosInstance.post<ApiRes<login_res>>("/user/login", data);
  await storeToken({token:res.data.data.accessToken});
  return res.data;
});
