import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';



export async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers()
    });


    if (!session) {
        const loginUrl = new URL('/auth/signin', request.url);

        loginUrl.searchParams.set(
            "redirect",
            request.nextUrl.pathname
        );

        return NextResponse.redirect(loginUrl);
    }
}


export const config = {
    matcher: ['/all-classes/:path+','/community-forum/:path+']
}