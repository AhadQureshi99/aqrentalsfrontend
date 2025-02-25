import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logUser, regUser } from "./userService";

// Initial state
const isUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: isUser ? isUser : null,
  userLoading: false,
  userError: false,
  userSuccess: false,
  userMessage: "",
};

// Create async thunk for registration
export const registerUser = createAsyncThunk(
  "registerUser",
  async (data, thunkAPI) => {
    try {
      return await regUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, thunkAPI) => {
    try {
      return await logUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Create slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReset: (state) => {
      state.userLoading = false;
      state.userError = false;
      state.userSuccess = false;
      state.userMessage = "";
    },
    // Add logout action
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user data from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = false;
        state.userSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
      })
      .addCase(loginUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = true;
        state.userMessage = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userError = false;
        state.userSuccess = true;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in localStorage
      });
  },
});

export default userSlice.reducer;
export const { userReset, logoutUser } = userSlice.actions;
