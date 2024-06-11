import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/itemSlice";

//입력 폼
const InputForm = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [expense, setExpense] = useState("");
  const [detail, setDetail] = useState("");

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
      const newItem = {
        date,
        category,
        expense: parseInt(expense),
        detail,
      };
      dispatch(addItem(newItem));

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
