import { List, Flex, Button, Progress, Card} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetExercisesQuery } from "../../../redux/services/exersiceApi";
import { Loader } from "../../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentModule } from "../../../redux/slices/moduleSlice";
import { selectUser } from "../../../redux/slices/authSlice";
import {
  useCreateUserExerciseProgressMutation,
  useGetAllUserExerciseProgressQuery,
} from "../../../redux/services/progressApi";
import { setCurrentExercise } from "../../../redux/slices/exerciseSlice";
import { setExerciseProgress } from "../../../redux/slices/userProgress/userProgressSlice";
import { useContext } from "react";
import { ThemeContext } from "../../../hooks/ThemeProvider";

const ModuleExercises = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { data, isLoading, isError } = useGetExercisesQuery(moduleId ?? "");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const user = useSelector(selectUser);
  const {
    data: allUserExerciseProgresses,
    isLoading: isAllUserExerciseProgressesLoading,
    isError: isAllUserExerciseProgressesError,
  } = useGetAllUserExerciseProgressQuery(user?._id ?? "");

  const [createUserExerciseProgress] = useCreateUserExerciseProgressMutation();

  const currentModule = useSelector(selectCurrentModule);
  const moduleName = currentModule?.name || "";

  const handleCreateUserExerciseProgress = async (
    exerciseId: string,
    exerciseNumber: number
  ) => {
    try {
      const existingProgress = user?.exerciseProgress.find(
        (progress: { progress: number; exerciseId: string }) => {
          dispatch(setExerciseProgress(progress.progress));
          return progress.exerciseId === exerciseId;
        }
      );

      if (!existingProgress) {
        const result = await createUserExerciseProgress({
          userId: user?._id ?? "",
          progress: {
            exerciseId: exerciseId,
            exerciseNumber: exerciseNumber,
            moduleName: moduleName,
            exerciseAnswers: {},
            progress: 0,
            completed: "false",
          },
        }).unwrap();
        dispatch(setExerciseProgress(result.progress));
      } else {
        console.log("Progress already exists for this exercise.");
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  if (isAllUserExerciseProgressesLoading) {
    return <Loader />;
  }

  if (isAllUserExerciseProgressesError) {
    return <div> Error loading Exercise...</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data || !Array.isArray(data.exercisesObj))
    return <p>Fehler beim Laden der Übungen</p>;

  const exercises = data.exercisesObj;
  const handleStartExerciseClick = (
    moduleId: string,
    exerciseId: string,
    exerciseNumber: number
  ) => {
    const currentexercise = exercises?.find((ex) => ex._id);
    dispatch(setCurrentExercise(currentexercise));
    handleCreateUserExerciseProgress(exerciseId, exerciseNumber);
    navigate(`/modules/${moduleId}/exercises/${exerciseId}`);
  };

  return (
    <List
      dataSource={exercises}
      renderItem={(exercise) => {
        const exerciseProgress = allUserExerciseProgresses?.find(
          (progress: { exerciseId: string }) =>
            progress.exerciseId === exercise._id
        );

        const progressPercentage = exerciseProgress
          ? exerciseProgress.progress
          : 0;

        return (
          <List.Item key={exercise._id}>
            <Card
              className={theme === "dark" ? "card-dark" : "card-light"}
              style={{ width: "80%", margin: "0 auto" }}
              title={`Вправа ${exercise.number}`}
            >
              <p>{exercise.instruction}</p>

              <Progress percent={progressPercentage} />
              <Flex justify="flex-end">
                <Button
                  style={{ marginTop: "1.4em" }}
                  type="primary"
                  onClick={() => {
                    if (moduleId && exercise._id && exercise.number) {
                      handleStartExerciseClick(
                        moduleId,
                        exercise._id,
                        exercise.number
                      );
                    } else {
                      console.error("moduleId or exercise._id is undefined");
                    }
                  }}
                  size="small"
                >
                  Почати
                </Button>
              </Flex>
            </Card>
          </List.Item>
        );
      }}
    />
  );
};

export default ModuleExercises;
