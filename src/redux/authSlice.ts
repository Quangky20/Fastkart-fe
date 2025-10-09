import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthService } from "../services/authService";
import type { LoginForm, UserRes } from "../types/auth";

type AuthState = {
  isAuthenticated: boolean | null;
  user: UserRes | null;
  refreshToken?: string;
  accessToken?: string;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  isAuthenticated: null,
  user: null,
  loading: false,
  error: null,
};

export const signin = createAsyncThunk(
  "auth/signin", // type
  async (payload: LoginForm, { rejectWithValue }) => {
    try {
      const response = await AuthService.signin(payload);
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const signout = createAsyncThunk(
  "auth/signout", // type
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.signout();
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe", // type
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthService.getMe();
      return response; // Dữ liệu trả về sẽ nằm ở action.payload
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.status == 401) {
          await dispatch(signout());
        }
        return rejectWithValue(err.response?.data || "Lỗi không xác định");
      }
      return rejectWithValue("Lỗi không xác định");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.isAuthenticated = null;
      localStorage.removeItem("me");
    },
  },
  extraReducers: (builder) => {
    builder
      // signin
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });

    builder
      // signout
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = null;
        state.user = null;
        localStorage.removeItem("me");
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });

    builder
      // getMe
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("me", JSON.stringify(action.payload));
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Lưu lỗi nếu có
      });
  },
});

// Export actions và reducer
export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
