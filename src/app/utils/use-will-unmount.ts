import { useRef, useEffect } from 'react';

/**
 * React lifecycle hook that calls a function when the component will unmount.
 * Equivalent to the `componentWillUnmount` method in a React.Component class.
 *
 * @param fn 
 * @see https://github.com/streamich/react-use/blob/master/src/useUnmount.ts
 */
export const useWillUnmount = (fn: () => any) => {
  const fnRef = useRef(fn);

  // Update the ref each render so that if it changes,
  // the newest callback will be invoked.
  fnRef.current = fn;

  useEffect(() => () => fnRef.current(), []);
};
