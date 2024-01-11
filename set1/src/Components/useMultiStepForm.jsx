import { useState } from "react";

export function useMultiStateForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [visited, setVisited] = useState([0]);

  function next() {
    setVisited((prev) => [...prev, currentStepIndex + 1]);
    setCurrentStepIndex((i) => {
      if (i > steps.length - 1) return i;
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goTo(index) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
    visited,
  };
}
