import { List, Flex, Button, Progress, Card, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useGetExercisesQuery } from "../../redux/services/exersiceApi";
import { Loader } from "../../components/Loader";
const ExerciseList = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { data, isLoading, isError } = useGetExercisesQuery(moduleId ?? "");

  if (isLoading) {
    return <Loader />;
  }

  if (isLoading) return <p>Lädt...</p>;
  if (isError || !data || !Array.isArray(data.exercisesObj))
    return <p>Fehler beim Laden der Übungen</p>;

  console.log(data.exercisesObj);
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
            {/* Displaying the progress bar */}
            <Progress percent={progressPercentage} />
            <Button size="small">Почати</Button>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ExerciseList;
