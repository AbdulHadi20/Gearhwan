import { clerkMiddleware, createClerkClient, createRouteMatcher } from '@clerk/astro/server';

// Create a Clerk client for server-side operations
const clerk = createClerkClient({ secretKey: import.meta.env.CLERK_SECRET_KEY });

// Define protected routes
//const isProtectedRoute = createRouteMatcher(['/buyacar(.*)']);

// Clerk middleware with custom redirect
//export const onRequest = clerkMiddleware((auth, context) => {
//  const { userId } = auth();
  
//  if (!userId && isProtectedRoute(context.request)) {
//    const currentUrl = new URL(context.request.url);
//    const signInUrl = new URL('/signin', context.request.url);
//    signInUrl.searchParams.set('redirect_url', currentUrl.pathname + currentUrl.search);
    
//    return Response.redirect(signInUrl, 302);
//  }
//}); 