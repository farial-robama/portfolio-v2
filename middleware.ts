export { default } from "next-auth/middleware";

// Protects everything under /admin EXCEPT /admin/login — otherwise
// you'd get an infinite redirect loop (protected page -> redirects to
// login -> login is also protected -> redirects to login -> ...).
export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};