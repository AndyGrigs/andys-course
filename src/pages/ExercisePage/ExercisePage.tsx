import { Button, Card, List, Flex } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import { useEffect } from "react";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { selectExerciseById } from "../../redux/slices/exerciseSlice";

export const ExercisePage: React.FC<{ exerciseId: string }> = ({
  exerciseId,
}) => {
  const exercise = useSelector((state: RootState) =>
    selectExerciseById(state, exerciseId)
  );
  if (!exercise) {
    return <div>Exercise not found</div>;
  }
  return <div>Exercise</div>;
};
