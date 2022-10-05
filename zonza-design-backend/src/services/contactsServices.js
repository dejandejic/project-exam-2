import { api, handleResponse, handleError } from "./apiServices";

export const all = (data) =>
    api()
        .post(`/contact/all`, data)
        .then(handleResponse)
        .catch(handleError);
