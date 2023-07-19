import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverParams {
  root: Element | Document | null;
  rootMargin: string;
  thresholds: number;
}

export const useIntersectionObserver = (options: UseIntersectionObserverParams) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (targetRef.current) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [options, targetRef]);

  return { targetRef, isIntersecting };
};
