import { Key } from "react";

export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  progress: number;
}
// "exerciseId": "6574a1258a71715508c69d2d",
//     "exerciseNumber": 2,
//     "moduleName": "Module 1",
//     "exerciseAnswers": {},
//     "progress": 100,
//     "completed": false

export interface ExerciseProgress {
  exerciseId: string;
  moduleName: string;
  exerciseAnswers: object;
  progress: number;
  completed: boolean;
}

export interface IUser {
  _id: string;
  fullName: string;
  code: string;
  moduleProgress: ModuleProgress[];
  exerciseProgress: ExerciseProgress[];
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface Module {
  _id: string;
  name: string;
  moduleGrammar: string[];
  videos: string[];
  vocabulary: IVocabulary[];
  exercises: string[];
}

export interface IVocabulary {
  word: string;
  translation: string;
  id: string;
}
export interface ITask {
  content: string;
  image: string;
  solution: string;
  _id: string;
}

export interface IExercise {
  _id: string;
  number: number;
  instruction: string;
  example: string;
  tasks: ITask[];
}

export interface IExerciseResponse {
  _id: Key | null | undefined;
  number: number;
  //instruction: ReactNode;
  instruction: string;
  example: string;
  tasks: ITask[];
  exercisesObj: IExercise[];
}
