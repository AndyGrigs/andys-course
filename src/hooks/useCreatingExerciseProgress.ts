import { useEffect, useState } from "react";
import { useCreateUserExerciseProgressMutation } from "../redux/services/progressApi";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";

interface UserProgressObject {
  exerciseId: string;
  moduleName: string;
  exerciseNumber: number | null;
  progress: number;
  exerciseAnswers: object;
  completed: boolean;
}

const useCreatingExerciseProgress = (
  exerciseId: string,
  moduleName: string,
  exerciseNumber: number
) => {
  const [initialProgress] = useState<UserProgressObject>({
    exerciseId: exerciseId || "",
    moduleName: moduleName || "",
    exerciseNumber: exerciseNumber || null,
    exerciseAnswers: {},
    progress: 1,
    completed: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [createUserExerciseProgress] = useCreateUserExerciseProgressMutation();
  const user = useSelector(selectUser);

  useEffect(() => {
    const postData = async () => {
      setIsLoading(true);
      try {
        await createUserExerciseProgress({
          userId: user?._id,
          initialProgress,
        }).unwrap();
        console.log("Success: User progress posted");
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
      setIsLoading(false);
    };

    postData();
  }, [createUserExerciseProgress, user, initialProgress]);

  return { isLoading, error, createUserExerciseProgress };

  //   useEffect(() => {
  //     const postData = async () => {
  //       setIsLoading(true);
  //       try {
  //         await createUserExerciseProgress({
  //           userId: user?._id,
  //           initialProgress,
  //         }).unwrap();
  //         console.log("Success: User progress posted");
  //       } catch (error) {
  //         if (error instanceof Error) {
  //           setError(error.message);
  //         } else {
  //           setError("An unknown error occurred");
  //         }
  //       }
  //       setIsLoading(false);
  //     };

  //     postData();
  //   }, [createUserExerciseProgress]);

  //   return { isLoading, error, createUserExerciseProgress };
};

export default useCreatingExerciseProgress;
