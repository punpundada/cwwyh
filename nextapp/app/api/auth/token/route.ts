import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const resData = {
        token: cookies().get('accessToken')?.value
    }

    return new Response(JSON.stringify(resData),{
        status:200,
        headers:{
            'Content-Type': 'application/json',
        }
    })
}