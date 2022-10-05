import axios from "axios";
import { BACKEND_URI } from "../constants/constants";

export const api = (token) => {
    if (typeof token === "string" && token.split(".").length === 3)
        return axios.create({
            baseURL: `${BACKEND_URI}/`,
            headers: { Authorization: token },
        });
    else
        return axios.create({
            baseURL: `${BACKEND_URI}/`,
        });
};

export const handleResponse = (res) => {
    try {
        const data = res.data;
        if (res.data.error) {
            const error = data.message ? data.message : data.error;
            return Promise.reject(error);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const handleError = (err) => {
    if (err.response.status === 401) {
    }
    return err.response.data;
};
