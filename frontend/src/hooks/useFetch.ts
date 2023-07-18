import { useEffect, useState } from 'react';

export const useFetch = <T>(fetchFn: (parameter: any) => Promise<T>, parameter: any) => {
  const [data, setData] = useState<T>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFn(parameter)
      .then(res => {
        setData(res);
      })
      .catch(rej => {
        setErrorMessage(rej.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return (() => {
      setData(undefined);
      setIsLoading(true);
      setErrorMessage(undefined);
    })();
  }, []);

  return { data, errorMessage, isLoading };
};
