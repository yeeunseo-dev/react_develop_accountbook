import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  /* 추가적인 전역 스타일을 여기에 작성할 수 있습니다 */
  @font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

  body {
    font-family: 'Pretendard-Regular', sans-serif;
    background-color: #f0f0f0;
    display: flex;
  justify-content: center;
  }

.wrapper {
  width: 1200px;
  padding: 10px;
  margin: 20px 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  width: 1200px;
  padding: 20px;
  margin: 20px 80px;
  border-radius: 8px;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.03);
  }

  .list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  color: #222222;
  width: 1200px;
  padding: 20px;
  margin: 20px 80px;
  border-radius: 8px;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.03);
  text-decoration: none;
  }

// 셀렉트박스 스타일

/* common */
/* 
.hide{
    display: none;
}
.show{
    display: block;
} */

/* 셀렉트 영역 스타일 */
/* .select{
    position: relative;
    height: 40px;
    padding: 5px 10px;
    width: 200px;
    border-radius: 4px;
    border:none;
    cursor: pointer;

    &:hover {
    border: 2px solid #01BFA7;
    outline: none };
} */

/* 옵션 영역 스타일 */
/* .select ul{
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    border:1px solid salmon;
    border-radius: 4px;
    background-color: #525252;
    cursor: pointer;
}
.select ul li{
    padding: 10px;
} */

  .button {
    font-size: 14px;
    height: 40px;
    background-color: #01BFA7;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 8px;
  }

  .main-button {
    background-color: #01BFA7;
  }

  .delete-button {
    background-color: #EE5D2A;
  }

  .back-button {
    background-color: #999999;
  }

  .month-button {
    font-family: 'Pretendard-Regular';
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    background-color: #F0F0F0;
    color: #222222;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 8px;

  &:hover {
    color: white;
    background-color: #01BFA7};
  }

.input {
  display: flex;
  height: 40px;
  font-size: 14px;
  width: 200px;
  border-radius: 4px;
  margin: 0 8px;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
  padding-left: 8px;

  &:focus {
  border: 2px solid #01BFA7;
  user-zoom: none;
  outline: none };
}

.highlight-text {
  color: #01BFA7;
  font-size: 36px;
  font-weight: 600;
  vertical-align: baseline;
}

.main-text {
  display: flex;
  align-items: center;
  color: #222222;
  font-size: 20px;
  font-weight: 600;
  vertical-align: baseline;
}

.label {
  color: #999999;
  font-weight: 400;
  font-size: 16px;
  margin: 8px 8px;
  }

  .detail-label {
    color: #999999;
    font-weight: 400;
    font-size: 14px;
    margin-left: 16px;
    margin-bottom: 8px;
  }

`;

export default GlobalStyle;
