import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addContact, deleteContact, getContact } from "./contactService";

const initialState = {
  contact: [], 
  contactLoading: false,
  contactError: false,
  contactSuccess: false,
  contactMessage: "",
};

export const addContactData = createAsyncThunk(
  "contact/addContact",
  async (contactData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().user.user.token;
      return await addContact(contactData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getContactData = createAsyncThunk(
  "contact/getContact",
  async (_, thunkAPI) => {
    try {
      return await getContact();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching contacts"
      );
    }
  }
);

export const deleteContactData = createAsyncThunk(
  "contact/deleteContact",
  async (contact_id, thunkAPI) => {
    try {
      return await deleteContact(contact_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    contactReset: (state) => {
      state.contactError = false;
      state.contactSuccess = false;
      state.contactLoading = false;
      state.contactMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContactData.pending, (state, action) => {
        state.contactLoading = true;
      })
      .addCase(addContactData.rejected, (state, action) => {
        state.contactLoading = false;
        state.contactError = true;
        state.contactMessage = action.payload;
      })
      .addCase(addContactData.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contactError = false;
        state.contactSuccess = true;
        state.contact = action.payload;
      })
      .addCase(getContactData.pending, (state, action) => {
        state.contactLoading = true;
      })
      .addCase(getContactData.rejected, (state, action) => {
        state.contactLoading = false;
        state.contactError = true;
        state.contactMessage = action.payload;
      })
      .addCase(getContactData.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contactError = false;
        state.contact = action.payload;
      })
      .addCase(deleteContactData.pending, (state, action) => {
        state.contactLoading = true;
      })
      .addCase(deleteContactData.rejected, (state, action) => {
        state.contactLoading = false;
        state.contactError = true;
        state.contactMessage = action.payload;
      })
      .addCase(deleteContactData.fulfilled, (state, action) => {
        state.contactLoading = false;
        state.contactError = false;
        state.contactSuccess = true;
        state.contact = action.payload;
      });
  },
});

export const { contactReset } = contactSlice.actions;

export default contactSlice.reducer;
