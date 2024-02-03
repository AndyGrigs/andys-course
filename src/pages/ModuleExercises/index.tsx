import { useParams } from "react-router-dom"
const ExerciseList = () => {
  const { moduleId } = useParams()
  return (
    <div>ExerciseList</div>
  )
}

export default ExerciseList