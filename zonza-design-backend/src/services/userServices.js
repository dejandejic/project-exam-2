import { api, handleResponse, handleError } from "./apiServices";

export const changePassword = (token, id, data) =>
  api(token)
    .put(`/user/change-password/${id}`, data)
    .then(handleResponse)
    .catch(handleError);
