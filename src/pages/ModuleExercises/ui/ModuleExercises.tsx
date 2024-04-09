import { List, Flex, Button, Progress, Card, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetExercisesQuery } from "../../../redux/services/exersiceApi";
import { Loader } from "../../../components/Loader";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentModule } from '../../../redux/slices/moduleSlice';
import { selectUser } from '../../../redux/slices/authSlice';
import { useCreateUserExerciseProgressMutation } from '../../../redux/services/progressApi';
import { setCurrentExercise } from '../../../redux/slices/exerciseSlice';
import { setExerciseProgress } from '../../../redux/slices/userProgress/userProgressSlice';

const ModuleExercises = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { data, isLoading, isError } = useGetExercisesQuery(moduleId ?? "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [createUserExerciseProgress] = useCreateUserExerciseProgressMutation();

  const currentModule = useSelector(selectCurrentModule);
  const moduleName = currentModule?.name || "";


  const handleCreateUserExerciseProgress = async (exerciseId: string, exerciseNumber: number) => {

    try {
      //call to the database or invalidate tag
      const existingProgress = user?.exerciseProgress.find((progress) => {
        dispatch(setExerciseProgress(progress.progress))
        return progress.exerciseId === exerciseId
      })

      if (!existingProgress) {
        const result = await createUserExerciseProgress({
          userId: user?._id ?? '',
          progress: {
            exerciseId: exerciseId,
            exerciseNumber: exerciseNumber,
            moduleName: moduleName,
            exerciseAnswers: {},
            progress: 0,
            completed: "false",
          }
        }).unwrap()
        dispatch(setExerciseProgress(result.progress))
        console.log("Success:", result);
      } else {
        console.log("Progress already exists for this exercise.");
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data || !Array.isArray(data.exercisesObj))
    return <p>Fehler beim Laden der Übungen</p>;

  const exercises = data.exercisesObj;
  const handleStartExerciseClick = (moduleId: string, exerciseId: string, exerciseNumber: number) => {
    const currentexercise = exercises?.find((ex) => ex._id);
    dispatch(setCurrentExercise(currentexercise))
    handleCreateUserExerciseProgress(exerciseId, exerciseNumber)
    navigate(`/module/${moduleId}/exercises/${exerciseId}`);
  };


  return (
    <List
      dataSource={exercises}
      renderItem={(exercise) => {
        const exerciseProgress = user?.exerciseProgress.find(
          (progress) => progress.exerciseId === exercise._id
        );

        const progressPercentage = exerciseProgress
          ? exerciseProgress.progress
          : 0;

        return (
          <List.Item key={exercise._id}>
            <Card style={{ width: "80%" }} title={`Exercise ${exercise.number}`}>
              <p>{exercise.instruction}</p>

              <Progress percent={progressPercentage} />
              <Button
                onClick={() => {
                  if (moduleId && exercise._id && exercise.number) {
                    handleStartExerciseClick(moduleId, exercise._id, exercise.number);
                  } else {
                    console.error("moduleId or exercise._id is undefined");
                  }
                }}
                size="small"
              >
                Почати
              </Button>
            </Card>
          </List.Item>
        )
      }}
    />
  );
};

export default ModuleExercises;
