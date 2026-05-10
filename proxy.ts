import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const cookieStore = request.cookies.get('auth_cookie')?.value;
    let parseCookie: any;

    cookieStore && (parseCookie = JSON.parse(cookieStore));
    const hasToken = parseCookie?.token;
    const hasMemberships = parseCookie?.hasMemberships;
    const { pathname } = request.nextUrl;

    console.log(parseCookie);

    if (!hasToken) {
        if(pathname !== '/'){
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next();
    }

    if (hasToken && !hasMemberships) {
        if (pathname !== '/choose-workspace') {
            return NextResponse.redirect(new URL('/choose-workspace', request.url))
        }
        return NextResponse.next();
    }

    if (hasToken && hasMemberships) {
        if (pathname === '/' || pathname === '/choose-workspace') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/choose-workspace',
        '/dashboard/:path*'
    ]
}