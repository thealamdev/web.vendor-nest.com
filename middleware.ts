import { NextRequest, NextResponse } from "next/server";
import { CookieEnum } from "./app/enums/CookieEnum";

export async function middleware(request: NextRequest) {
    if (request.method === "OPTIONS") return NextResponse.next();
    
    const authCookie = request.cookies.get(CookieEnum.AUTH_COOKIE)?.value;
    const organizationContextCookie = request.cookies.get(CookieEnum.ORGANIZATION_CONTEXT)?.value;
    console.log('context', organizationContextCookie);

    let parseAuthCookie: any = null;
    let parseOrganizationContextCookie: any = null;

    try {
        if (authCookie) {
            parseAuthCookie = JSON.parse(authCookie);
        }
        if (organizationContextCookie) {
            parseOrganizationContextCookie = JSON.parse(organizationContextCookie);
        }
    } catch (e) {
        console.error("Cookie parse error", e);
    }

    const hasToken = parseAuthCookie?.token;
    const hasMemberships = parseAuthCookie?.hasMemberships;
    const hasOrganizationContext = parseOrganizationContextCookie;

    const { pathname } = request.nextUrl;

    // const publisPaths = [
    //     '/',
    // ];

    // const protectedPaths = [
    //     '/choose-workspace',
    //     '/dashboard'
    // ];

    // protectedPaths.some((path: string) => {
    //     console.log(path)
    // })

    if (!hasToken) {
        if (pathname !== '/') {
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

    if (hasToken && hasOrganizationContext) {
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