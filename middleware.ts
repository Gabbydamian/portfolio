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

    // Admin/Dashboard routes that require authentication
    const adminRoutes = ["/dashboard", "/admin"];

    const isAdminRoute = adminRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isAdminRoute) {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        // If no session, redirect to admin login page
        if (!session) {
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
