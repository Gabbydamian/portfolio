import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        supabaseResponse.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    // Refresh session if needed
    await supabase.auth.getSession();

    // Check if user is trying to access protected routes
    const { pathname } = request.nextUrl;

    // Only check authentication for admin and dashboard routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        // If authenticated user tries to access /admin login page, redirect to dashboard
        if (pathname === "/admin" && session) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // Dashboard routes require authentication
        if (pathname.startsWith("/dashboard") && !session) {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
};
