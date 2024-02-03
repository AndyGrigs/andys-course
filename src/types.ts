export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  progress: Record<string, UserProgress>
}

export interface UserProgress {
  moduleId: string;
  progress: number;
  completed: boolean;
}

export interface Module {
  id: string;
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
  id: string;
  number: number;
  instruction: string;
  example: string;
  tasks: ITask[];

}