import { uwajudgeDB } from "@/lib/database-client";
import { z } from "zod";

/**
 * Throttles requests based on a key, max requests, and time window.
 * @param {string} key - Unique key to identify the throttle lock.
 * @param {number} maxRequests - Maximum number of allowed requests.
 * @param {number} timeWindow - Time window in seconds for the throttle.
 * @throws Will throw an error if the limit is exceeded.
 */
export default async function throttle(
  _key: string,
  maxRequests: number,
  timeWindow: number,
) {
  const key = `throttle:${_key}`;
  const now = Date.now();
  const windowStart = now - timeWindow * 1000;

  // Fetch the cache for the given key
  let cache = await uwajudgeDB.cache.findUnique({
    where: { key },
  });

  let timestamps = z.array(z.number()).catch([]).parse(cache?.value);
  timestamps = timestamps.filter((ts) => ts >= windowStart);

  if (timestamps.length >= maxRequests) {
    throw new Error(
      `Too many requests. Max limit of ${maxRequests} requests within ${timeWindow} seconds exceeded.`,
    );
  }

  // Add the current request timestamp
  timestamps.push(now);

  // Upsert the cache with the updated timestamps
  await uwajudgeDB.cache.upsert({
    where: { key },
    update: { value: timestamps },
    create: { key, value: timestamps },
  });
}
