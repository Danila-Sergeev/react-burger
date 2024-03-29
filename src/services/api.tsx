import { BURGER_API_URL } from "../utils/constants";
import { getCookie, setCookie } from "../utils/cookie";
export const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: string) => Promise.reject(err));
};

export const refreshToken = () => {
  const refreshToken = getCookie("reftoken");
  if (!refreshToken) {
    throw new Error("Refresh token is invalid");
  }
  return fetch(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: "Bearer " + refreshToken,
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkResponse);
};
async function refreshTokenApi() {
  const refreshToken = getCookie("reftoken");
  if (!refreshToken) {
    throw new Error("Refresh token is invalid");
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + refreshToken,
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  };

  const response = await fetch(`${BURGER_API_URL}/auth/token`, requestOptions);
  if (!response.ok) {
    throw new Error("Failed to refresh token.");
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error("Failed to refresh token.");
  }

  const { accessToken, refreshToken: newRefreshToken } = data;
  setCookie("token", accessToken.split("Bearer ")[1]);
  setCookie("reftoken", newRefreshToken);
  return { accessToken, refreshToken: newRefreshToken };
}

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);

    const response = await checkResponse(res);

    return response;
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshTokenApi();
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      const response = await checkResponse(res);
      return response;
    } else {
      return Promise.reject(err);
    }
  }
};
