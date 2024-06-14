import { jsonApi } from "./auth";

export const getExpenses = async () => {
  try {
    const response = await jsonApi.get("/expenses");
    return response.data;
  } catch (error) {
    console.error(error);
    alert("뭔가 잘못된 것 같아요! 데이터를 로드할 수 없어용");
    throw error;
  }
};

export const getExpense = async ({ queryKey }) => {
  try {
    const response = await jsonApi.get(`/expenses/${queryKey[1]}`);
    return response.data;
  } catch (error) {
    console.error(error);
    alert("뭔가 잘못된 것 같아요! 데이터를 로드할 수 없어용");
    throw error;
  }
};

export const postExpense = async (newExpense) => {
  try {
    const { data } = await jsonApi.post("/expenses", newExpense);
    return data;
  } catch (error) {
    console.error(error);
    alert("뭔가 잘못된 것 같아요! 데이터가 써지지 않아요!");
  }
};

export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;
  try {
    const { data } = await jsonApi.put("/expenses/${id}", rest);
    return data;
  } catch (error) {
    alert("뭔가 잘못된 것 같아요! 데이터가 수정되지 않아요!");
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const { data } = await jsonApi.delete("/expenses/${id}");
    return data;
  } catch (error) {
    console.error(error);
    alert("뭔가 잘못된 것 같아요! 데이터가 삭제되지 않아요!");
    throw error;
  }
};
