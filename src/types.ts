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

export interface IUser {
  id: string; // Assuming the id is the string representation of _id.$oid
  fullName: string;
  email: string;
  createdAt: string; // Assuming it's in ISO 8601 format
  updatedAt: string; // Assuming it's in ISO 8601 format
  token: string; // Assuming this is provided from somewhere else, not present in the database object
  progress: {
    [moduleId: string]: {
      moduleId: string;
      moduleNumber: number;
      progress: number;
      completed: "not_started" | "in_progress" | "completed";
    }[];
  };
}


export interface UserProgress {
  moduleId: string;
  progress: number;
  completed: boolean;
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
  id: string;
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
  instruction: ReactNode;
  exercisesObj: IExercise[];
}
