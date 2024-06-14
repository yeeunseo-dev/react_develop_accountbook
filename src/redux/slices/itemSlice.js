import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [];

export const itemSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push({ id: uuidv4(), ...action.payload });
    },
    updateItem: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;
