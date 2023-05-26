import { useCallback, useState } from "react";

// Custom hook to handle changes in UI
export const useMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Transition to provided mode in params
  // useCallback to prevent rerenders when used as depen
  const transition = useCallback((value, replace = false) => {
    setMode(value);
    setHistory((prev) => {
      // Copy array to prevent mutation
      let output = [...prev];

      // If replace is true, then remove last from array
      // Allows new value to replace previous mode
      if (replace) {
        output.pop();
      }
      return [...output, value];
    });
  }, []);

  // Go back one time in history array
  const back = () => {
    setHistory((prev) => {
      // Copy array to prevent mutation
      let output = [...prev];

      // Remove last in history
      output.pop();

      // Set current mode to last index of new array
      setMode(output[output.length - 1]);
      return [...output];
    });
  };

  return { history, mode, back, transition };
};
