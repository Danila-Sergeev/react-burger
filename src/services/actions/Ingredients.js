export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

function fetchPosts() {
  const url = "https://norma.nomoreparties.space/api/ingredients";
  return fetch(url, { method: "GET" }).then((response) =>
    Promise.all([response, response.json()])
  );
}

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    return fetchPosts()
      .then(([res, json]) => {
        if (res.ok) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: json.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
