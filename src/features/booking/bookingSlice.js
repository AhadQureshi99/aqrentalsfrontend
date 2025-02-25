import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addBookingData, deleteBooking, getBooking } from "./bookingService";



const initialState = {
  bookings: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};


export const createBooking = createAsyncThunk(
  "booking/create",
  async ({ carId, bookingData, token }, thunkAPI) => {
    try {
      return await addBookingData(carId, bookingData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Booking failed. Try again.");
    }
  }
);


export const getBookingData = createAsyncThunk(
  "booking/getBooking",
  async (_, thunkAPI) => {
    try {
      return await getBooking();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching bookings"
      );
    }
  }
);

export const deleteBookingData = createAsyncThunk(
  "booking/deleteBooking",
  async (booking_id, thunkAPI) => {
    try {
      return await deleteBooking(booking_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);


export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }).addCase(getBookingData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBookingData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBookingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(deleteBookingData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteBookingData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBookingData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
