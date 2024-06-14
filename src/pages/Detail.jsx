import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateItem, deleteItem } from "../redux/slices/itemSlice";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getExpense, putExpense, deleteExpense } from "../api/expense";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);

  const {
    data: selectedExpense,
    isLoading,
    error,
  } = useQuery({ queryKey: ["expenses", id], queryFn: getExpense });

  console.log(selectedExpense);

  const dateRef = useRef(null);
  const categoryRef = useRef(null);
  const detailRef = useRef(null);
  const expenseRef = useRef(null);

  useEffect(() => {
    if (selectedExpense) {
      setDate(selectedExpense.date);
      setCategory(selectedExpense.category);
      setDetail(selectedExpense.detail);
      setExpense(selectedExpense.expense);
    }
  }, [selectedExpense]);

  const mutationEdit = useMutation({
    mutationFn: putExpense,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const item = items.find((item) => item.id === id);

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleUpdate = () => {
    const newItem = {
      date: dateRef.current.value,
      category: categoryRef.current.value,
      detail: detailRef.current.value,
      expense: parseInt(expenseRef.current.value),
      id: item.id,
    };
    dispatch(updateItem(newItem));

    const newExpense = {
      id: id,
      date: date,
      category: category,
      detail: detail,
      expense: parseInt(expense),
    };
    mutationEdit.mutate(newExpense);

    const selectedMonth = newItem.date.substring(5, 7) + "월";
    navigate(-1, { replace: true });
  };

  const handleDelete = () => {
    // if (window.confirm("정말 삭제하시겠습니까?")) {
    //   dispatch(deleteItem(item.id));
    //   navigate("/");
    mutationDelete.mutate(id);
  };

  const handleBack = () => {
    const selectedMonth = item.date.substring(5, 7) + "월";
    navigate(-1, { replace: true, state: { selectedMonth } });
  };

  // 현재 html의 정보를 알고 싶을 때 useRef사용

  return (
    <>
      <div className="container">
        <div>
          <div className="detail-label">날짜</div>
          <input
            className="input"
            type="text"
            defaultValue={item.date}
            ref={dateRef}
          />
        </div>
        <div>
          <div className="detail-label">항목</div>
          <input
            className="input"
            type="text"
            defaultValue={item.category}
            ref={categoryRef}
          />
        </div>
        <div>
          <div className="detail-label">내용</div>
          <input
            className="input"
            type="text"
            defaultValue={item.detail}
            ref={detailRef}
          />
        </div>
        <div>
          <div className="detail-label">금액</div>
          <input
            className="input"
            type="number"
            defaultValue={item.expense}
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
