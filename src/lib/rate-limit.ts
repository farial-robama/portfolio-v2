/**
 * Simple in-memory rate limiter. Good enough for a solo-owner
 * portfolio's contact form — no Redis needed. Limitation worth
 * knowing: this resets whenever the server restarts, and won't
 * share state across multiple server instances if you ever scale
 * to more than one. Fine for this use case; not a general-purpose
 * production rate limiter.
 */

const hits = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 3; // 3 submissions per minute per IP

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}