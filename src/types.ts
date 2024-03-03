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
  completed: boolean;
}

export interface UserModuleProgress {
  userId: string;
  moduleProgress: ModuleProgress;
  // moduleProgress: ModuleProgress[];
}

export interface ExerciseProgress {
  exerciseId: string;
  exerciseName: string;
  progress: number;
  completed: boolean;
}

export interface UserExerciseProgress {
  userId: string;
  exerciseProgress: ExerciseProgress;
  // exerciseProgress: ExerciseProgress[];
}

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  moduleProgress: {
    moduleId: string;
    moduleNumber: number;
    progress: number;
    completed: "in_progress" | "completed" | "not_started";
  }[];
  exerciseProgress: {
    exerciseId: string;
    exerciseNumber: number;
    progress: number;
    completed: "in_progress" | "completed" | "not_started";
  }[];
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
