import { Key, ReactNode } from "react";

export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

// export interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   createdAt: string;
//   updatedAt: string;
//   token: string;
//   progress: Record<string, UserProgress>;
// }

// export interface IUser {
//   id: string;
//   fullName: string;
//   email: string;
//   createdAt: string;
//   updatedAt: string;
//   token: string;
//   progress: {
//     [moduleId: string]: {
//       moduleId: string;
//       moduleNumber: number;
//       progress: number;
//       completed: "not_started" | "in_progress" | "completed";
//     }[];
//   };
// }

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
