import { api, handleResponse, handleError } from "./apiServices";

export const getAllDocuments = (data) =>
    api()
        .post(`/get_all_documents`, data)
        .then(handleResponse)
        .catch(handleError);
export const SendContact = (data) =>
    api().post(`/contact/add`, data).then(handleResponse).catch(handleError);
export const SendFeedback = (data) =>
    api().post(`/feedback/add`, data).then(handleResponse).catch(handleError);
