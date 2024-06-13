import { authApi } from "./axios";

export const register = async ({ id, password, nickname }) => {
  try {
    const response = await authApi.post("/register", {
      id,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    alert(err.response.data.message);
  }
};

export const login = async ({ id, password }) => {
  try {
    const response = await authApi.post("/login?expiresIn=20m", {
      id,
      password,
    });
    return response.data;
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const getUserInfo = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await authApi.get("/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
      alert("AccessToken이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
    }
  }
};
