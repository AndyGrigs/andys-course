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
  vocabulary: { word: string; translation: string; id: string }[];
  exercises: string[];

}