import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export const jsonApi = axios.create({
  baseURL: "https://prickle-instinctive-stone.glitch.me",
});

// authApi.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// authApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (err) => {
//     alert(err.response.data.message);
//     if (
//       err.response.data.message ===
//       "토큰이 만료되었습니다. 다시 로그인 해주세요."
//     ) {
//       // 로그아웃처리
//       return store.dispatch(logout());
//     }
//     return Promise.reject(err);
//   }
// );

// jsonApi.interceptors.request.use(
//   async (config) => {
//     const { data } = await authApi.get("/user");
//     if (data?.success) return config;
//     return Promise.reject(new Error("사용자 정보 조회에 실패 했습니다."));
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

export const register = async ({ id, password, nickname }) => {
  try {
    const response = await authApi.post("/register", {
      id,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    alert(err?.response?.data?.message);
  }
};

export const login = async ({ id, password }) => {
  try {
    const response = await authApi.post("/login?expiresIn=20m", {
      id,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    alert(error?.response?.data?.message);
  }
};

export const getUserInfo = async () => {
  console.log("getUserInfo");
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await authApi.get("/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      alert("AccessToken이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
    }
  }
};

export const updateProfile = async (formData) => {
  console.log(formData);
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await authApi.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      // alert("AccessToken이 만료되었습니다. 다시 로그인해주세요.");
      // localStorage.clear();
    }
  }
};
