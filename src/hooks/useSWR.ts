import { useState, useEffect } from 'react';

// Simple in-memory cache for SWR pattern
const cache: Record<string, { data: any; timestamp: number }> = {};
const fetchers: Record<string, Promise<any>> = {};
const mutators: Record<string, (() => void)[]> = {};

export async function mutate(key: string, data?: any) {
  if (data !== undefined) {
    cache[key] = { data, timestamp: Date.now() };
  }
  
  // Trigger update for all active hooks using this key
  if (mutators[key]) {
    mutators[key].forEach(trigger => trigger());
  }
}

export function useSWR<T>(key: string, fetcher: () => Promise<T>, options: { dedupingInterval?: number, refreshInterval?: number } = { dedupingInterval: 60000 }) {
  const [data, setData] = useState<T | null>(cache[key] ? cache[key].data : null);
  const [error, setError] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(!cache[key]);

  useEffect(() => {
    let isMounted = true;

    const revalidate = async (force = false) => {
      const cached = cache[key];
      const isStale = force || !cached || (Date.now() - cached.timestamp > (options.dedupingInterval || 60000));

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
        
        // Performance: Avoid re-rendering if data is identical
        const dataChanged = JSON.stringify(newData) !== JSON.stringify(cache[key]?.data);
        
        if (dataChanged) {
          cache[key] = { data: newData, timestamp: Date.now() };
          if (isMounted) {
            setData(newData);
            setError(null);
          }
        } else {
          // Just update timestamp to keep it fresh in cache
          cache[key].timestamp = Date.now();
        }
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        delete fetchers[key];
        if (isMounted) setIsValidating(false);
      }
    };

    // Register this component as a listener for mutations
    if (!mutators[key]) mutators[key] = [];
    const trigger = () => revalidate(true);
    mutators[key].push(trigger);

    revalidate();

    // Setup polling if refreshInterval is provided
    let interval: any;
    if (options.refreshInterval) {
        interval = setInterval(() => {
            revalidate(true);
        }, options.refreshInterval);
    }

    // Revalidate on focus optionally could go here...
    const onFocus = () => {
       // Only revalidate if stale according to deduping interval
       revalidate();
    };

    window.addEventListener('focus', onFocus);
    return () => {
      isMounted = false;
      window.removeEventListener('focus', onFocus);
      if (interval) clearInterval(interval);
      // Unregister mutation listener
      if (mutators[key]) {
        mutators[key] = mutators[key].filter(t => t !== trigger);
      }
    };
  }, [key, options.dedupingInterval, options.refreshInterval]); // fetcher is omitted to avoid unnecessary re-renders if not memoized

  return { data, error, isValidating, mutate: (newData?: T) => mutate(key, newData) };
}
