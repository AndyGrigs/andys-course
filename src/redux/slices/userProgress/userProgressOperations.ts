// userProgressOperations.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useUpdateUserModuleProgressMutation } from '../../services/progressApi';

// Define the async thunk action creator
export const updateUserModuleProgress = createAsyncThunk(
    'userProgress/update',
    async ({ userId, progress }: { userId: string; progress: object }, thunkAPI) => {
        try {
            const [updateUserModuleProgress] = useUpdateUserModuleProgressMutation();
            const response = await updateUserModuleProgress({ userId, progress }).unwrap();
            return response;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            } else {
                return thunkAPI.rejectWithValue('An unknown error occurred');
            }
        }
    }
);

// interface FetchModuleProgressPayload {
//   userId: string;
//   moduleId: string;
// }
// interface FetchExerciseProgressPayload {
//   userId: string;
//   moduleId: string;
// }

// export const fetchModuleProgress = createAsyncThunk('progress/module/fetch', async (payload: FetchModuleProgressPayload, thunkAPI) => {
//   try {
//     const { userId, moduleId } = payload;
//     const data = await fetchUserModuleProgress(userId, moduleId);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       return thunkAPI.rejectWithValue(error.message);
//     } else {
//       return thunkAPI.rejectWithValue('An unknown error occurred');
//     }
//   }
// });



// export const fetchExerciseProgress = createAsyncThunk('progress/exersise/fetch', async (payload: FetchExerciseProgressPayload, thunkAPI) => {
//   try {
//     const { userId, moduleId } = payload;
//     const data = await fetchUserExerciseProgress(userId, moduleId);
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       return thunkAPI.rejectWithValue(error.message);
//     } else {
//       return thunkAPI.rejectWithValue('An unknown error occurred');
//     }
//   }
// });