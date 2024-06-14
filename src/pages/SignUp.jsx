import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../api/auth";

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

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (id.length < 4 || id.length > 10) {
      alert("아이디는 4글자에서 10글자 이내로만 가능합니다!");
      return;
    }

    if (password.length < 4 || password.length > 15) {
      alert("패스워드는 4글자에서 15글자 이내로만 가능합니다!");
      return;
    }

    if (nickname.length < 1 || nickname.length > 10) {
      alert("닉네임은 1글자에서 10글자 이내로만 가능합니다!");
      return;
    }

    // api 호출을 진짜로 하는 부분
    const response = await register({
      id,
      password,
      nickname,
    });
    if (response) {
      confirm("회원가입이 완료되었습니다.");
      navigate("/login");
    }
    console.log("회원가입!", response);
  };

  return (
    <div>
      <Container>
        <Form>
          <Title>회원가입</Title>

          <div className="tag-label">아이디</div>
          <Input
            name="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디 (4~10글자)"
            minLength={4}
            maxLength={10}
          />

          <div className="tag-label">비밀번호</div>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 (4~15글자)"
            minLength={4}
            maxLength={15}
          />

          <div className="tag-label">닉네임</div>
          <Input
            name="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임 (1~10글자)"
            minLength={1}
            maxLength={10}
          />

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
              onClick={handleRegister}
            >
              회원가입
            </button>

            <ToggleText>
              <span
                onClick={(e) => {
                  navigate("/login");
                }}
              >
                로그인으로
              </span>
            </ToggleText>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SignUp;
