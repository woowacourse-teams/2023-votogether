import { useCallback, useEffect, useState } from 'react';

export const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setData(null);
    setErrorMessage(null);

    fetchFn()
      .then(res => {
        setData(res);
      })
      .catch(error => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchFn]);

  useEffect(() => {
    refetch();
  }, []);

  return { data, errorMessage, isLoading, refetch };
};
