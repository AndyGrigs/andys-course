
import { useNavigate } from 'react-router-dom';


const useExerciseNavigation = () => {
   const navigate = useNavigate();

   const handleExerciseList = async (moduleId: string) => {

      navigate(`/modules/${moduleId}/exercises`);

   };

   return { handleExerciseList };
};

export default useExerciseNavigation;