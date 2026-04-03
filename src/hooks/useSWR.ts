import { useState, useEffect } from 'react';

// Simple in-memory cache for SWR pattern
const cache: Record<string, { data: any; timestamp: number }> = {};
const fetchers: Record<string, Promise<any>> = {};

export function useSWR<T>(key: string, fetcher: () => Promise<T>, options = { dedupingInterval: 60000 }) {
  const [data, setData] = useState<T | null>(cache[key] ? cache[key].data : null);
  const [error, setError] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(!cache[key]);

  useEffect(() => {
    let isMounted = true;

    const revalidate = async () => {
      const cached = cache[key];
      const isStale = !cached || (Date.now() - cached.timestamp > options.dedupingInterval);

      if (!isStale) {
        if (isMounted && data !== cached.data) {
           setData(cached.data);
        }
        setIsValidating(false);
        return;
      }

      setIsValidating(true);
      
      try {
        // Prevent duplicate requests (deduping)
        if (!fetchers[key]) {
           fetchers[key] = fetcher();
        }
        
        const newData = await fetchers[key];
        
        cache[key] = { data: newData, timestamp: Date.now() };
        if (isMounted) {
          setData(newData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        delete fetchers[key];
        if (isMounted) setIsValidating(false);
      }
    };

    revalidate();

    // Revalidate on focus optionally could go here...
    const onFocus = () => {
       // Only revalidate if stale according to deduping interval
       revalidate();
    };

    window.addEventListener('focus', onFocus);
    return () => {
      isMounted = false;
      window.removeEventListener('focus', onFocus);
    };
  }, [key, options.dedupingInterval]); // fetcher is omitted to avoid unnecessary re-renders if not memoized

  return { data, error, isValidating };
}
