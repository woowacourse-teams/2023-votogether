import { useEffect, useState } from 'react';

export const useFetch = <T>(fetchFn: (parameter: any) => Promise<T>, parameter: any) => {
  const [postDetail, setPostDetail] = useState<T>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFn(parameter)
      .then(res => {
        setPostDetail(res);
      })
      .catch(rej => {
        setErrorMessage(rej.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return (() => {
      setPostDetail(undefined);
      setIsLoading(true);
      setErrorMessage(undefined);
    })();
  }, []);

  return { postDetail, errorMessage, isLoading };
};
