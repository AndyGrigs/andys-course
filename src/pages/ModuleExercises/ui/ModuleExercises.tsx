import { Progress } from "antd";
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
import { AppCard } from "../../../components/ui/AppCard/ui/AppCard";

const ModuleExercises = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { data, isLoading, isError } = useGetExercisesQuery(moduleId ?? "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const existingProgress = allUserExerciseProgresses?.find(
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
    <>
    <section>
      {exercises.map((exercise, index) => {
        const exerciseProgress = allUserExerciseProgresses?.find(
          (progress: { exerciseId: string }) =>
            progress.exerciseId === exercise._id
        );

        const progressPercentage = exerciseProgress
          ? exerciseProgress.progress
          : 0;
        return (
          <AppCard
            key={exercise._id}
            title={`Вправа ${index + 1}`}
            description={exercise.instruction}
            buttonText="Почати"
            style={{ width: "80%", margin: "0 auto" }}
            buttonOnClick={() => {
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
          >
            <Progress percent={progressPercentage} />
          </AppCard>


        );
      })}
      </section>
    </>
    // <List
    //   dataSource={exercises}
    //   renderItem={(exercise, index) => {
    //     console.log(index);
    // const exerciseProgress = allUserExerciseProgresses?.find(
    //   (progress: { exerciseId: string }) =>
    //     progress.exerciseId === exercise._id
    // );

    // const progressPercentage = exerciseProgress
    //   ? exerciseProgress.progress
    //   : 0;

    //     return (
    //    <>
    // <AppCard
    //   title={`Вправа ${index + 1}`}
    //   description={exercise.instruction}
    //   buttonText="Почати"
    //   style={{ width: "80%", margin: "0 auto" }}
    //   buttonOnClick={() => {
    //     if (moduleId && exercise._id && exercise.number) {
    //       handleStartExerciseClick(
    //         moduleId,
    //         exercise._id,
    //         exercise.number
    //       );
    //     } else {
    //       console.error("moduleId or exercise._id is undefined");
    //     }
    //   }}
    // >
    //    <Progress percent={progressPercentage} />
    // </AppCard>
    //       </>
    //     );
    //   }}
    // />
  );
};

export default ModuleExercises;
