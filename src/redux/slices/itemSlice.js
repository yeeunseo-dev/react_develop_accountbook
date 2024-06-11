import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = [
  {
    id: "1",
    date: "2024-05-23",
    category: "식비 🍚",
    detail: "점심식사",
    expense: 12000,
  },
  {
    id: "2",
    date: "2024-01-12",
    category: "쇼핑 🛍️",
    detail: "봄옷 쇼핑",
    expense: 54000,
  },
  {
    id: "3",
    date: "2024-02-08",
    category: "쇼핑 🛍️",
    detail: "고양이 간식",
    expense: 14800,
  },
  {
    id: "4",
    date: "2023-08-30",
    category: "교통 🚗",
    detail: "기차표 예매",
    expense: 48000,
  },
  {
    id: "5",
    date: "2023-06-27",
    category: "식비 🍚",
    detail: "고등 동창모임",
    expense: 28900,
  },
];

export const itemSlice = createSlice({
  name: "items",
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
