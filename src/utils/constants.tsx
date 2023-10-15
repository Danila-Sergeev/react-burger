import { format, isToday, isYesterday } from "date-fns";

export const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const wsUrl = "wss://norma.nomoreparties.space/orders";

export const request = (endpoint: string, fetchType: any, options: any) => {
  return fetchType(`${BURGER_API_URL}${endpoint}`, options);
};

export const formatDate = (isoString: any) => {
  const date = new Date(isoString);

  let formattedDate;
  if (isToday(date)) {
    formattedDate = "Сегодня";
  } else if (isYesterday(date)) {
    formattedDate = "Вчера";
  } else {
    formattedDate = format(date, "dd.MM.yyyy");
  }

  const formattedTime = format(date, "HH:mm");
  let timeZone = format(date, "xxx");

  // Убираем двоеточие и нолики
  timeZone = timeZone.replace(/:00/g, "").replace(/\+0/g, "+");

  return `${formattedDate}, ${formattedTime} i-GMT${timeZone}`;
};
