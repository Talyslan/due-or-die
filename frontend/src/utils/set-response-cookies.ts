import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

export function setResponseCookies(
    response: NextResponse,
    cookies: ResponseCookie[],
) {
    cookies.forEach(cookie => {
        response.cookies.set(cookie);
    });
}
