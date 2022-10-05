import { api, handleResponse, handleError } from "./apiServices";

export const all = (data) =>
    api()
        .post(`/feedback/all`, data)
        .then(handleResponse)
        .catch(handleError);
