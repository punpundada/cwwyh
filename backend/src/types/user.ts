import { Types } from "mongoose"

export type TokenUser = {
    id: Types.ObjectId,
    email: string,
    firstName:string,
    lastName:string,
    imgUrl:string
  }

export type ReqUser<T>={
    user:TokenUser,
    reqBody:T
}