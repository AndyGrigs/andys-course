import { List, Card, Flex, Button } from "antd";
import { useParams } from "react-router-dom";
import { useGetExercisesQuery } from "../../redux/services/exersiceApi";
const ExerciseList = () => {
  const { moduleId } = useParams();
  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetExercisesQuery(moduleId);

  if (isLoading) return <p>Lädt...</p>;
  if (isError) return <p>Fehler beim Laden der Übungen</p>;

  return (
    <List.Item key=" ">
      <Card
        style={{ textAlign: "center" }}
        title="Here you are going to do some practice"
      >
        <Flex justify="center" align="center" vertical gap={10}>
          <div> You will find here your exercises</div>
          <Button size="small">Почати</Button>
        </Flex>
      </Card>
    </List.Item>
  );
};

export default ExerciseList;
