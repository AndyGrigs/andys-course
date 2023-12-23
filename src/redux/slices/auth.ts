import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the function parameter if needed
interface LoginParams {
  username: string;
  password: string;
  // Add other properties if necessary
}

// Define a type for your data returned by the API
interface UserData {
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

export const fetchUserData = createAsyncThunk<UserData, LoginParams>(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post<UserData>(
      "http://localhost:4444/auth/login",
      params
    );
    return data;
  }
);

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
