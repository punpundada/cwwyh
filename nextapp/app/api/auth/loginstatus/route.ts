import { cookies } from "next/headers";

export async function GET(request: Request) {
    const token= cookies().get("accessToken")?.value

  return new Response(JSON.stringify({isLoggedIn:!!token}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}