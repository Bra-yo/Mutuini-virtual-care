/**
 * useFetch Hook
 * Generic data fetching hook with loading and error states
 */

import { useCallback, useEffect, useState } from "react";

interface UseFetchOptions {
  skip?: boolean;
  refetchInterval?: number;
}

export const useFetch = <T,>(
  fetchFn: () => Promise<T>,
  options?: UseFetchOptions
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Fetch failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
  if (options?.skip) return;

  const timeout = setTimeout(() => {
    refetch();
  }, 0);

  let interval: NodeJS.Timeout | undefined;

  if (options?.refetchInterval) {
    interval = setInterval(refetch, options.refetchInterval);
  }

  return () => {
    clearTimeout(timeout);

    if (interval) {
      clearInterval(interval);
    }
  };
}, [refetch, options?.skip, options?.refetchInterval]);

  return { data, loading, error, refetch };
};
