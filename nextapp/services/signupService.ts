import axiosInstance from "@/constants/axiosInstance";
import { ApiRes } from "@/types/ApiRes";
import { ISignupReq } from "@/types/ISignupReq";
import { cache } from "react";

export interface ISignup_res {
  email: string;
  userId: string;
  message: string;
}

export const signupService = cache(async (data: ISignupReq) => {
  try {
    const res = await axiosInstance.post<ApiRes<ISignup_res>>(
      "user/signup",
      data
    );
    if (res?.data?.isSuccess) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
});
