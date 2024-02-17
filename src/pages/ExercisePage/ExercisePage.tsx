import { Button, Card, List, Flex, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import React from "react";

// export const ExercisePage: React.FC<{ exerciseId: string }> = ({
//   exerciseId,
// }) => {
//   const exercise = useSelector((state: RootState) =>
//     selectExerciseById(state, exerciseId)
//   );
//   console.log('Exercise ID:', exerciseId);
//   console.log('Exercise State:', state.exercise);

//   if (!exercise) {
//     return <div>Exercise not found</div>;
//   }
//   return <div>Exercise</div>;
// };

// export const ExercisePage: React.FC<{ exerciseId: string }> = ({
//   exerciseId,
// }) => {
//     const exercise = useSelector((state: RootState) => {
//       const selectedExercise = selectExerciseById(state, exerciseId);
//       console.log("Exercise State:", state.exercise);
//       return selectedExercise;
//     });
//   const exercise = useSelector((state: RootState) => {
//     const allExercises = state.exercise.allExercises;
//     const selectedExercise = allExercises.find((ex) => ex._id === exerciseId);
//     console.log("Selected Exercise:", selectedExercise);
//     return selectedExercise;
//   });
//   console.log("Exercise ID:", exerciseId); // Log the exercise ID

//   if (!exercise) {
//     return <div>Exercise not found</div>;
//   }
//   return <div>Exercise</div>;
// };

export const ExercisePage: React.FC = ({}) => {
  const { exerciseId } = useParams<{ exerciseId: string }>();

  // const exercise = useSelector((state: RootState) => {
  //   const allExercises = state.exercise.allExercises;
  //   const selectedExercise = allExercises.find((ex) => ex._id === exerciseId);
  //   console.log("Selected Exercise:", selectedExercise);
  //   console.log(" Exercise Id:", exerciseId);
  //   return selectedExercise;
  // });

  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }
  console.log(exercise);
  // const [inputValue, setInputValue] = useState("");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  return (
    // <div style={{ color: "wheat" }}>
    //   <h1>{exercise.number}</h1>
    //   <p>{exercise.instruction}</p>
    //   <p>{exercise.example}</p>
    //   {exercise.tasks &&
    //     exercise.tasks.map((task) => (
    //       <List key={task._id}>{task.content}</List>
    //     ))}
    // </div>
    <div style={{ color: "wheat" }}>
      <h1>{exercise.number}</h1>
      <p>{exercise.instruction}</p>
      <p>{exercise.example}</p>
      {exercise.tasks &&
        exercise.tasks.map((task, index) => {
          const parts = task.content.split("{{input}}");
          return (
            <div key={task._id}>
              {parts.map((part, partIndex) => (
                <React.Fragment key={partIndex}>
                  <Flex>
                    <p>{part}</p>
                    {partIndex < parts.length - 1 && (
                      <Input
                        style={{ width: "20%" }}
                        placeholder="Enter text here"
                      />
                    )}
                  </Flex>
                </React.Fragment>
              ))}
            </div>
          );
        })}
    </div>
  );
};
