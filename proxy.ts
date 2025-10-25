import { NextRequest, NextResponse } from "next/server"
export function proxy(request: NextRequest) {
    const protectedPaths = ["/","/profile","/profile/edit"]
    if (protectedPaths.includes(request.nextUrl.pathname)) {
        const cookie = request.cookies.get("sessionToken") 
        if (!cookie) { 
            return NextResponse.redirect(new URL("/signup", request.url))
        }
}
}