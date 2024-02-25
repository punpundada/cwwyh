import { cookies ,headers} from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    const token = cookies().get('accessToken')?.value;
    const requestHeaders = new Headers(request.headers)
    // requestHeaders.set('authorization',token ?? '')
    const resData:any = await fetch('http://localhost:3000/api/auth/token',{method:'get'});
    const responce = NextResponse.next({
        request:{
            ...request,
            headers:requestHeaders
        }
    })
    return responce;
  }