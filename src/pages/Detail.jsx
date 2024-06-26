import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { updateItem, deleteItem } from "../redux/slices/itemSlice";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExpense, putExpense, deleteExpense } from "../api/expense";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const items = useSelector((state) => state.items);
  const queryClient = useQueryClient();

  const {
    data: selectedExpense,
    isPending,
    error,
  } = useQuery({ queryKey: ["expenses", id], queryFn: () => getExpense(id) });

  const dateRef = useRef(null);
  const categoryRef = useRef(null);
  const detailRef = useRef(null);
  const expenseRef = useRef(null);

  useEffect(() => {
    if (selectedExpense) {
      dateRef.current.value = selectedExpense.date;
      categoryRef.current.value = selectedExpense.category;
      detailRef.current.value = selectedExpense.detail;
      expenseRef.current.value = selectedExpense.expense;
    }
  }, [selectedExpense]);

  const mutationEdit = useMutation({
    mutationFn: (updatedExpense) => putExpense({ id, ...updatedExpense }),
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: () => deleteExpense(id),
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const handleUpdate = () => {
    const selectedExpense = {
      date: dateRef.current.value,
      category: categoryRef.current.value,
      detail: detailRef.current.value,
      expense: parseInt(expenseRef.current.value),
    };
    mutationEdit.mutate(selectedExpense);
  };

  // const item = items.find((item) => item.id === id);

  // if (!item) {
  //   return <div>Item not found</div>;
  // }

  // const handleUpdate = () => {
  //   const newExpense = {
  //     date: dateRef.current.value,
  //     category: categoryRef.current.value,
  //     detail: detailRef.current.value,
  //     expense: parseInt(expenseRef.current.value),
  //     id: item.id,
  //   };
  //   dispatch(updateItem(newItem));

  //   const putExpense = {
  //     id: id,
  //     date: date,
  //     category: category,
  //     detail: detail,
  //     expense: parseInt(expense),
  //   };
  //   mutationEdit.mutate(putExpense);

  //   const selectedMonth = newItem.date.substring(5, 7) + "월";
  //   navigate(-1, { replace: true });
  // };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      navigate("/");
      mutationDelete.mutate(selectedExpense.id);
    }
  };

  const handleBack = () => {
    const selectedMonth = selectedExpense.date.substring(5, 7) + "월";
    navigate(-1, { replace: true, state: { selectedMonth } });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 현재 html의 정보를 알고 싶을 때 useRef사용

  return (
    <>
      <div className="container">
        <div>
          <div className="detail-label">날짜</div>
          <input
            className="input"
            type="text"
            defaultValue={selectedExpense?.date}
            ref={dateRef}
          />
        </div>
        <div>
          <div className="detail-label">항목</div>
          <input
            className="input"
            type="text"
            defaultValue={selectedExpense?.category}
            ref={categoryRef}
          />
        </div>
        <div>
          <div className="detail-label">내용</div>
          <input
            className="input"
            type="text"
            defaultValue={selectedExpense?.detail}
            ref={detailRef}
          />
        </div>
        <div>
          <div className="detail-label">금액</div>
          <input
            className="input"
            type="number"
            defaultValue={selectedExpense?.expense}
            ref={expenseRef}
          />
        </div>
      </div>
      <div className="wrapper">
        <button className="button main-button" onClick={handleUpdate}>
          수정
        </button>
        <button className="button delete-button" onClick={handleDelete}>
          삭제
        </button>
        <button className="button back-button" onClick={handleBack}>
          뒤로가기
        </button>
      </div>
    </>
  );
};

export default Detail;
