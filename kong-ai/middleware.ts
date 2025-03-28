import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';


const isPublicRoute = createRouteMatcher(
  [
    '/home',
    '/sign-in(.*)', 
    '/sign-up(.*)', 
    "/api/assistant/create", 
    "/api/thread", 
    "/api/message/create", 
    "/api/message/list",
    "/api/run/create",
    "/api/run/retrieve",
    "/api/challenge-users",
    "/api/openai",
    "/api/send-notifications"
  ])

export default clerkMiddleware(async (auth, request) => {

  const { userId } = await auth()

  // If not signed in and trying to access '/', redirect to '/home'
  if (request.nextUrl.pathname === '/' && !userId) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}