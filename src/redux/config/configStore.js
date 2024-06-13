import { configureStore } from "@reduxjs/toolkit";
import items from "../slices/itemSlice";

const store = configureStore({
  reducer: {
    items,
  },
});

export default store;
