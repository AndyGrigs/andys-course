import { List, Flex, Button, Progress, Card, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetExercisesQuery } from "../../../redux/services/exersiceApi";
import { Loader } from "../../../components/Loader";

export const ModuleExercises = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { data, isLoading, isError } = useGetExercisesQuery(moduleId ?? "");
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data || !Array.isArray(data.exercisesObj))
    return <p>Fehler beim Laden der Übungen</p>;

  const handleStartExerciseClick = (moduleId: string, exerciseId: string) => {
    navigate(`/module/${moduleId}/exercises/${exerciseId}`);
  };

  const progressPercentage = 50;
  const exercises = data.exercisesObj;
  // getExerciseProgress(exercise)
  return (
    <List
      dataSource={exercises}
      renderItem={(exercise) => (
        <List.Item key={exercise._id}>
          <Card style={{ width: "80%" }} title={`Exercise ${exercise.number}`}>
            <p>{exercise.instruction}</p>

            <Progress percent={progressPercentage} />
            <Button
              onClick={() => {
                if (moduleId && exercise._id) {
                  handleStartExerciseClick(moduleId, exercise._id);
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
      )}
    />
  );
};
