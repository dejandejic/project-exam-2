import { api, handleResponse, handleError } from "./apiServices";

export const loginApi = data =>
  api()
    .post("/auth/login", data)
    .then(handleResponse)
    .catch(handleError);

export const logoutApi = token =>
  api(token)
    .get("/auth/logout")
    .then(handleResponse)
    .catch(handleError);

export const checkApi = token =>
  api(token)
    .get("/auth/check")
    .then(handleResponse)
    .catch(handleError);
