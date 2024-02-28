"use server"

import { cookies } from "next/headers";

interface StoreTokenRequest {
  token: string;
}

export async function storeToken(request: StoreTokenRequest) {
  cookies().set({
    name: "accessToken",
    value: request.token,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    // expires:3600000,
  });
}

export async function testCookies(){
  cookies().set({
    name:'test',
    value:"Test Cookie",
    httpOnly:true,
    sameSite:'strict',
  })
}

export const deleteToken = async () => {
  const res = cookies().delete("accessToken");
};

export const checkIsLoggedIn = async () =>
  !!cookies().get("accessToken")?.value;
