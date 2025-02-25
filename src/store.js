import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import carReducer from "./features/cars/carSlice";
import bookingReducer from "./features/booking/bookingSlice";
import contactReducer from "./features/contact/contactSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carReducer,
    bookings: bookingReducer,
    contact: contactReducer,
  },
});

export default store;
