import { useRef } from 'react';

/**
 * React lifecycle hook that calls a function before the component mounts.
 * Equivalent to the `constructor` and `componentWillMount()` methods in a React.Component class.
 *
 * @param fn Callback function to execute before the component mounts.
 * @see https://stackoverflow.com/a/56818036/11455106
 */
export const useWillMount = (fn: () => any) => {
  const willMountRef = useRef(true);
  const fnRef = useRef(fn);

  fnRef.current = fn;

  if (willMountRef.current) {
    fnRef.current();
  }

  willMountRef.current = false;
};
