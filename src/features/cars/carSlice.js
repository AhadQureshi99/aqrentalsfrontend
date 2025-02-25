import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCar,
  addToCart,
  deleteCar,
  deleteCart,
  deleteFromCart,
  getCars,
  getMyCart,
  updateCar,
} from "./carService"; // ✅ Fixed typo

const initialState = {
  cars: [],
  carLoading: false,
  carError: false,
  carMessage: "",
  carSuccess: false,
  cart: [],
  cartLoading: false,
  cartError: false,
  cartMessage: "",
  cartSuccess: false,
};


export const addCarData = createAsyncThunk(
  "cars/addCar",
  async (carData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().user.user.token;
      return await addCar(carData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deleteCarData = createAsyncThunk(
  "delete-car",
  async (car_id, thunkAPI) => {
    try {
      return await deleteCar(car_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const deleteSingleCartData = createAsyncThunk(
  "delete-cart",
  async (cart_id, thunkAPI) => {
    try {
      return await deleteCart(cart_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const updateCarData = createAsyncThunk(
  "update-car",
  async (car_data, thunkAPI) => {
    try {
      return await updateCar(car_data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const addCartData = createAsyncThunk(
  "add-to-cart",
  async (car_id, thunkAPI) => {
    try {
      let token = thunkAPI.getState().user.user.token;
      return await addToCart(car_id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const getCartData = createAsyncThunk(
  "cart/getMyCart",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().user.user.token;
      return await getMyCart(token);
    } catch (error) {
      console.error("Error in getCartData:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load cart"
      );
    }
  }
);


export const deleteCartData = createAsyncThunk(
  "delete-from-cart",
  async (_, thunkAPI) => {
    try {
      return await deleteFromCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Async Thunk to Get Cars
export const getCarData = createAsyncThunk(
  "cars/getCars",
  async (_, thunkAPI) => {
    try {
      return await getCars();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching cars"
      );
    }
  }
);

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    carReset: (state) => {
      state.carError = false;
      state.carLoading = false;
      state.carMessage = "";
      state.carSuccess = false;
    },
    cartReset: (state) => {
      state.cartError = false;
      state.cartLoading = false;
      state.cartMessage = "";
      state.cartSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Add Car Request
      .addCase(addCarData.pending, (state) => {
        state.carLoading = true;
        state.carError = false;
        state.carSuccess = false;
      })
      .addCase(addCarData.fulfilled, (state, action) => {
        state.carLoading = false;
        state.carError = false;
        state.carSuccess = true;
        state.cars.push(action.payload);
      })
      .addCase(addCarData.rejected, (state, action) => {
        state.carLoading = false;
        state.carError = true;
        state.carMessage = action.payload;
      })

      .addCase(getCarData.pending, (state) => {
        state.carLoading = true;
      })
      .addCase(getCarData.rejected, (state, action) => {
        state.carLoading = false;
        state.carError = true;
        state.carMessage = action.payload;
      })
      .addCase(getCarData.fulfilled, (state, action) => {
        state.carLoading = false;
        state.cars = action.payload;
      })
      .addCase(addCartData.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(addCartData.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(addCartData.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartSuccess = true;
        state.cart = action.payload;
      })
      .addCase(getCartData.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.cartMessage = action.payload;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError=false;
        state.cart = action.payload || []
      })
      .addCase(deleteCartData.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(deleteCartData.fulfilled, (state) => {
        state.cartLoading = false;
        state.cart = []; // Clear cart after deletion
      })
      .addCase(deleteCartData.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.message = action.payload;
      })
      .addCase(deleteSingleCartData.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(deleteSingleCartData.fulfilled, (state) => {
        state.cartLoading = false;
      })
      .addCase(deleteSingleCartData.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.message = action.payload;
      })
      .addCase(deleteCarData.pending, (state) => {
        state.carLoading = true;
      })
      .addCase(deleteCarData.fulfilled, (state) => {
        state.carLoading = false;
      })
      .addCase(deleteCarData.rejected, (state, action) => {
        state.carLoading = false;
        state.carError = true;
        state.message = action.payload;
      })
      .addCase(updateCarData.pending, (state) => {
        state.carLoading = true;
      })
      .addCase(updateCarData.fulfilled, (state) => {
        state.carLoading = false;
        
      })
      .addCase(updateCarData.rejected, (state, action) => {
        state.carLoading = false;
        state.carError = true;
        state.message = action.payload;
      });
  },
});

export const { carReset, cartReset } = carSlice.actions;
export default carSlice.reducer;
