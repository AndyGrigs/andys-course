To handle inputs using `useRef` in your `ExerciseDetailsPage.tsx` component, you'll need to make a few changes. Instead of using `useState` to manage the input values, you'll use `useRef` to create a reference to each input element. This allows you to directly access the input's value without having to manage state for each input.

Here's how you can rewrite the input handling part of your component using `useRef`:

```tsx
import React, { useRef, useEffect } from "react";
// ... other imports

export const ExerciseDetailsPage = () => {
  // ... other code

  // Create a ref for each input
  const inputRefs = useRef<{
    [key: string]: React.RefObject<HTMLInputElement>[];
  }>({});

  // Initialize input refs for each task part
  useEffect(() => {
    if (exercise) {
      exercise.tasks.forEach((task) => {
        const parts = task.content.split("{{input}}");
        inputRefs.current[task._id] = parts.map(() =>
          React.createRef<HTMLInputElement>()
        );
      });
    }
  }, [exercise]);

  // ... other code

  const handleCheckAnswer = () => {
    if (!exercise) {
      setResultMessage("Exercise not loaded");
      return;
    }

    // Get the input values from the refs
    const inputValues = Object.entries(inputRefs.current).reduce(
      (acc, [taskId, refs]) => {
        acc[taskId] = refs.map((ref) => ref.current?.value.trim() || "");
        return acc;
      },
      {} as { [key: string]: string[] }
    );

    const isCorrect = checkAnswer(
      currentTask._id,
      currentTaskIndex,
      inputValues,
      exercise
    );
    setResultMessage(isCorrect ? "Correct!" : "Incorrect. Try again.");
    setIsAnswerChecked(false);
  };

  // ... other code

  return (
    // ... other JSX
    <Flex justify="center" align="center" style={{ marginTop: "2.5em" }}>
      {parts.map((part, partIndex) => (
        <React.Fragment key={partIndex}>
          {part && (
            <Col>
              <Paragraph style={{ margin: "0 1em 0 1em", fontSize: "1.5em" }}>
                {part}
              </Paragraph>
            </Col>
          )}
          {partIndex < parts.length - 1 && (
            <Col span={3}>
              <Input
                ref={inputRefs.current[currentTask._id][partIndex]}
                style={{
                  maxWidth: "100%",
                  color: "#000000",
                  fontSize: "1.5em",
                }}
                placeholder="Antwort..."
              />
            </Col>
          )}
        </React.Fragment>
      ))}
    </Flex>
    // ... other JSX
  );
};
```

In this updated code:

- `useRef` is used to create a reference to each input element.
- `useEffect` is used to initialize the refs for each task part when the `exercise` data is available.
- The `handleCheckAnswer` function has been updated to get the input values directly from the refs instead of using state.

Please note that using `useRef` in this way means that the input values are not part of the component's state, and changes to the inputs will not trigger a re-render of the component. If you need to perform actions based on input changes, you may still need to use `useState` or `useEffect` to listen for changes to the input values.
