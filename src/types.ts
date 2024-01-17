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
}

export interface Module {
  _id: string;
  name: string;
  moduleGrammar: string[]; // Or use the appropriate data type for moduleGrammar
  videos: string[]; // Or use the appropriate data type for videos
  vocabulary: { word: string; translation: string; _id: string }[];
  exercises: string[]; // Or use the appropriate data type for exercises

}