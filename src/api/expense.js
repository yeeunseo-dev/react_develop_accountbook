import axios from "axios";
import { jsonApi } from "./axios";

export const getExpenses = async () => {
  try {
    const response = await jsonApi.get("/expenses");
    return response.data;
  } catch (error) {
    alert("뭔가 잘못된 것 같아요!");
  }
};
