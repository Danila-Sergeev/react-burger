export const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export const request = (endpoint, fetchType, options) => {
  return fetchType(`${BURGER_API_URL}${endpoint}`, options);
};
