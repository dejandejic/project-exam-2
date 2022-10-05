import { api, handleResponse, handleError } from "./apiServices";

export const getDocsByCustomerId = (data) =>
    api()
        .post(`/get_all_documents`, data)
        .then(handleResponse)
        .catch(handleError);

export const uploadDocs = (token, data) =>
    api(token)
        .post("/customer/add/doc", data)
        .then(handleResponse)
        .catch(handleError);

export const deleteDocById = (token, id) =>
    api(token)
        .delete(`/customer/delete/doc/${id}`)
        .then(handleResponse)
        .catch(handleError);
