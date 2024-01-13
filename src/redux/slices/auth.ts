import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the function parameter if needed
export interface LoginParams {
  email: string;
  password: string;
  // Add other properties if necessary
}

// Define a type for your data returned by the API
export interface UserData {
  // Define the structure of the user data
  id: number;
  name: string;
  email: string;
  // Add other properties as needed
}

// Define the type for the state
export interface AuthState {
  data: UserData | null;
  status: "loading" | "loaded" | "error";
}

// Define the initial state with the type
const initialState: AuthState = {
  data: null,
  status: "loading",
};

export const fetchUserData = createAsyncThunk<
  UserData,
  LoginParams,
  { rejectValue: string }
>("auth/fetchUserData", async function (params, { rejectWithValue }) {
  const { data } = await axios.post<UserData>(
    "http://localhost:4444/auth/login",
    params
  );

  if (!data) {
    return rejectWithValue("Server error!");
  }
  return data;
});

// Assuming UserData and LoginParams are defined elsewhere
// import { UserData, LoginParams } from 'path-to-your-types';

// export const fetchUserData = createAsyncThunk<
//   UserData, // Return type for the payload creator
//   LoginParams, // First argument to the payload creator
//   {
//     rejectValue: string; // Types for ThunkAPI parameters
//   }
// >("auth/fetchUserData", async (params: LoginParams, { rejectWithValue }) => {
//   try {
//     const response = await axios.post<UserData>(
//       "http://localhost:4444/auth/login",
//       params
//     );
//     if (!response.data) {
//       throw new Error("No data received from the server");
//     }
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       // Handle a response error from axios
//       return rejectWithValue(error.response.data);
//     } else {
//       // Handle any other errors
//       return rejectWithValue("Server error!");
//     }
//   }
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
        state.data = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = "loaded";
          state.data = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
  },
});

export const authReducer = authSlice.reducer;
