/* eslint-disable @typescript-eslint/ban-types */
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { useUpdateUserExerciseProgressMutation, useUpdateUserModuleProgressMutation } from '../../services/progressApi';


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

interface UpdateUserExerciseProgressPayload {
    userId: string;
    progress: number;
}

type UpdateUserExerciseProgressReturnValue = unknown;



// export const updateUserExerciseProgressThunk = createAsyncThunk(
//  'userProgress/updateExerciseProgress',
//  async ({ userId, progress }: { userId: string; progress: number }, thunkAPI) => {
//     try {
//       // Dispatch the mutation action
//       const action = useUpdateUserExerciseProgressMutation({ userId, progress });
//       // Assuming you have access to the Redux store's dispatch function
//       const dispatch = thunkAPI.dispatch;
//       await dispatch(action);
//       // Optionally, you can return the result of the mutation
//       return action.payload;
//     } catch (error) {
//       // Handle errors
//       return thunkAPI.rejectWithValue(error.message);
//     }
//  }
// );

// export const updateUserExerciseProgress: AsyncThunk<
//     UpdateUserExerciseProgressReturnValue,
//     UpdateUserExerciseProgressPayload,
//     {}
// > = createAsyncThunk(
//     'userProgress/update',
//     async ({ userId, progress }: { userId: string; progress: number }, thunkAPI) => {
//         try { const [] = useUpdateUserExerciseProgressMutation();
           
//             const response = await updateUserModuleProgress({ userId, progress }).unwrap();
//             return response;
//         } catch (error) {
//             if (error instanceof Error) {
//                 return thunkAPI.rejectWithValue(error.message);
//             } else {
//                 return thunkAPI.rejectWithValue('An unknown error occurred');
//             }
//         }
//     }
// );

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