
export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface ModuleProgress {
  moduleProgress: number;
  exerciseProgress: number;
  moduleId: string;
  moduleName: string;
  progress: number;
}

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
  points: number;
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
  text: {
    title: string;
    content: string;
  };
  videos: string[];
  vocabulary: IVocabulary[];
  exercises: string[];
}

export interface IVocabulary {
  word: string;
  translation: string;
  instruction: string;
  correctAnswer: string;
  options: { answer: string }[];
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
  _id: string;
  number: number;
  instruction: string;
  example: string;
  tasks: ITask[];
  exercisesObj: IExercise[];
}
