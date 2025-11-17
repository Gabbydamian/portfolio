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

    // Protected routes that require authentication
    const protectedRoutes = ["/learning"];

    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        // If no session and trying to create a learning post, redirect to login
        if (!session && pathname.includes("/learning")) {
            // Allow viewing learning posts, but protect the form/creation
            const isCreatingPost = pathname === "/learning" && request.method === "POST";

            if (isCreatingPost) {
                return NextResponse.redirect(new URL("/admin", request.url));
            }
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
