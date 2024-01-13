import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface LoginParams {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  data: UserData | null;
  status: "loading" | "loaded" | "error";
}

const initialState: AuthState = {
  data: null,
  status: "loading",
};

// export const fetchUserData = createAsyncThunk<
//   UserData,
//   LoginParams,
//   { rejectValue: string }
// >("auth/fetchUserData", async function (params, { rejectWithValue }) {
//   const { data } = await axios.post<UserData>(
//     "http://localhost:4444/auth/login",
//     params
//   );

//   if (!data) {
//     return rejectWithValue("Server error!");
//   }
//   return data;
// });

export const fetchUserData = createAsyncThunk<UserData, LoginParams>(
  "auth/fetchUserData",
  async (params) => {
    // Your asynchronous logic to fetch user data goes here
    // For example, you can make an API call using axios:
    const response = await axios.post(
      "http://localhost:4444/auth/login",
      params
    );
    return response.data;
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
