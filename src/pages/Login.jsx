import React, { useState } from "react";
import styled from "styled-components";
import { authApi } from "../api/axios";
import useForm from "../hooks/useForm";
import { register, login, getUserInfo } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 480px;
  align-content: center;
  justify-content: center;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  margin: 20px auto;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.03);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 240px;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 60px auto 40px;
`;

const Input = styled.input`
  margin: 12px auto 24px;
  width: 224px;
  display: flex;
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
  padding-left: 8px;

  &:focus {
    border: 2px solid #01bfa7;
    user-zoom: none;
    outline: none;
  }
`;

const ToggleText = styled.div`
  text-align: center;
  width: 100%;
  margin: 8px 0 60px;
  font-size: 14px;
  & span {
    color: #999999;
    user-select: none;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;

const Login = ({ setUser }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  const { formState, onChangeHandler, resetForm } = useForm({
    id: "",
    password: "",
    nickname: "",
  });
  const { id, password, nickname } = formState;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const { data } = await authApi.post("/login?expiresIn=20m", {
          id,
          password,
        });
        const { success, accessToken, avatar, nickname, userId } = await login({
          id,
          password,
        });

        if (success) {
          alert("로그인 성공");
          localStorage.setItem("accessToken", accessToken);
          setIsLogin(true);
          navigate("/");
          setUser({ userId, nickname, avatar });
        }
      } catch (err) {
        alert(err?.response?.data?.message);
        console.error(err);
      }
    } else {
      // 회원가입 처리
      try {
        const { success } = await register({ id, password, nickname });
        if (success) {
          setIsLoginMode(true);
          resetForm();
          alert("회원가입 성공");
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <Container>
        <Form onSubmit={onSubmitHandler}>
          <Title>{isLoginMode ? "로그인" : "회원가입"}</Title>

          <div className="tag-label">아이디</div>
          <Input
            name="id"
            type="text"
            value={id}
            onChange={onChangeHandler}
            placeholder="아이디 (4~10글자)"
            minLength={4}
            maxLength={10}
          />

          <div className="tag-label">비밀번호</div>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={onChangeHandler}
            placeholder="비밀번호 (4~15글자)"
            minLength={4}
            maxLength={15}
          />

          {!isLoginMode && (
            <>
              <div className="tag-label">닉네임</div>
              <Input
                name="nickname"
                value={nickname}
                onChange={onChangeHandler}
                placeholder="닉네임 (1~10글자)"
                minLength={1}
                maxLength={10}
              />
            </>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              className="button main-button"
              style={{
                width: "240px",
                margin: "12px 0 10px 0",
              }}
            >
              {isLoginMode ? "로그인" : "회원가입"}
            </button>

            <ToggleText>
              <span onClick={() => setIsLoginMode((prev) => !prev)}>
                {isLoginMode ? "회원가입으로" : "로그인으로"}
              </span>
            </ToggleText>
          </div>

          {/* {isLogin && <button onClick={handleLogout}>로그아웃</button>} */}
        </Form>
      </Container>
    </div>
  );
};

export default Login;
