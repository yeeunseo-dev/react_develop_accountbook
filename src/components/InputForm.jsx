import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/itemSlice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExpenses, postExpense } from "../api/expense";
import { useNavigate } from "react-router-dom";

//입력 폼
const InputForm = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState("");
  const [detail, setDetail] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expense"]);
      navigate(0);
    },
  });

  const dateHandler = (e) => {
    setDate(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const expenseHandler = (e) => {
    setExpense(e.target.value);
  };

  const detailHandler = (e) => {
    setDetail(e.target.value);
  };

  // 등록 시 리스팅, alert
  const handleSubmit = () => {
    if (!date || !category || !expense || !detail) {
      alert("전체를 입력해주세요");
    } else {
      const newExpense = {
        date,
        category,
        detail,
        expense: parseInt(expense),
      };
      mutation.mutate(newExpense);
      // const newItem = {
      //   date,
      //   category,
      //   expense: parseInt(expense),
      //   detail,
      // };
      // dispatch(addItem(newItem));

      setDate("");
      setCategory("");
      setExpense("");
      setDetail("");
    }
  };

  return (
    <>
      {/* <지출을 등록하는 컴포넌트 /> */}
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            className="input"
            type="text"
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={dateHandler}
          />

          <input
            className="input"
            type="text"
            placeholder="카테고리를 입력해주세요"
            value={category}
            onChange={categoryHandler}
          />

          <input
            className="input"
            type="text"
            placeholder="세부내용을 입력해주세요"
            value={detail}
            onChange={detailHandler}
          />

          <input
            className="input"
            type="number"
            placeholder="금액을 입력해주세요"
            value={expense}
            onChange={expenseHandler}
          />

          <span>
            <button className="button main-button" onClick={handleSubmit}>
              저장
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default InputForm;
