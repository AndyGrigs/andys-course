import { Key } from "react";

export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface ModuleProgress {
  moduleId: string;
  moduleNumber?: number;
  progress: number;
  completed: boolean;
}

export interface ExerciseProgress {
  exerciseId: string;
  progress: number;

}


export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
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
