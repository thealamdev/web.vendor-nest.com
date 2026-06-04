import { NextRequest, NextResponse } from "next/server";
import { CookieEnum } from "./app/enums/CookieEnum";

const PUBLIC_PATHS = ['/auth/vendor/login', '/auth/vendor/register'];
const NO_ORG_CONTEXT_PATHS = ['/auth/vendor/organization', '/choose-organization'];
const AUTH_PATHS = ['/dashboard'];

function matchesPath(pathname: string, paths: string[]): boolean {
    return paths.some((path) => pathname === path || pathname.startsWith(path + "/"));
}

const redirect = (pathname: string, request: NextRequest): NextResponse => {
    return NextResponse.redirect(new URL(pathname, request.url))
}

const parseCookie = (request: NextRequest) => {
    const authCookie = request.cookies.get(CookieEnum.AUTH_COOKIE)?.value;
    const organizationContextCookie = request.cookies.get(CookieEnum.ORGANIZATION_CONTEXT)?.value;

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

    const hasToken = Boolean(parseAuthCookie?.token);
    const hasMembersips = Boolean(parseAuthCookie?.hasMemberships);
    const hasOrganizationContext = Boolean(parseOrganizationContextCookie);

    return {
        hasToken,
        hasMembersips,
        hasOrganizationContext
    }
}

export async function middleware(request: NextRequest) {
    if (request.method === "OPTIONS") return NextResponse.next();

    const { pathname } = request.nextUrl;
    const { hasToken, hasMembersips, hasOrganizationContext } = parseCookie(request);

    if (hasToken) {
        if (matchesPath(pathname, Array.prototype.concat(PUBLIC_PATHS, NO_ORG_CONTEXT_PATHS))) {
            if (hasOrganizationContext) {
                return redirect("/dashboard", request);
            }
        }

        if (matchesPath(pathname, Array.prototype.concat(PUBLIC_PATHS, AUTH_PATHS))) {
            if (!hasOrganizationContext) {
                return redirect('/choose-organization', request)
            }
        }

        if (hasMembersips) {
            if (matchesPath(pathname, ['/auth/vendor/organization'])) {
                return redirect('/choose-organization', request)
            }
        }
    }

    if (!hasToken) {
        if (matchesPath(pathname, Array.prototype.concat(NO_ORG_CONTEXT_PATHS, AUTH_PATHS))) {
            return redirect('/', request);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/auth/vendor/login',
        '/auth/vendor/register',
        '/choose-organization',
        '/auth/vendor/organization',
        '/dashboard/:path*'
    ]
}