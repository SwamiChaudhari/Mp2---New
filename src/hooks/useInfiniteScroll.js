import { useRef, useEffect } from 'react';

const useInfiniteScroll = (callback, options = {}) => {
  const containerRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    
    if (!container || !callback) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
        ...options,
      }
    );

    // Create a sentinel element for infinite scroll
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    container.appendChild(sentinel);

    observer.current.observe(sentinel);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      if (sentinel.parentNode) {
        sentinel.parentNode.removeChild(sentinel);
      }
    };
  }, [callback, options]);

  return [containerRef];
};

export default useInfiniteScroll;
