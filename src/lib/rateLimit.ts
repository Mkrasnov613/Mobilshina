/**
 * Minimal in-memory fixed-window rate limiter for the contact-email route.
 * Mirrors the old Express limiter (4 requests / 15 min). Note: state is
 * per-serverless-instance, so this is best-effort — swap for Upstash Redis if
 * abuse becomes a problem.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 4;

const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

// Opportunistic cleanup so the map doesn't grow unbounded.
export function pruneRateLimit(): void {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}
