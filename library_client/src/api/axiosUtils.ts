import { AxiosError, AxiosResponse } from "axios";
import { User } from "../types/login";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const API_LIBRARY = `${BASE_URL}/library`;
export const API_USER = `${BASE_URL}/user`;

export const getUserToken = () => {
    let userStr = localStorage.getItem('user');
    let user: User | null = userStr !== "" && userStr !== null ? JSON.parse(userStr) : null;

    return user?.token ?? '';
};

export const axiosExecuteGet = (axiosGet: any, setData: any, setLoading: any, setError: any) => {
    return axiosGet.then((res: AxiosResponse) => {
        setData(res.data);
    })
    .catch((err: any) => {
        setError(err?.message + ": " +(err?.response?.data?.message ?? ''));
    })
    .finally(() => {
        setLoading(false);
    })
}

export const axiosExecutePost = (axiosPost: any, setLoading: any, setError: any, setData: any = (data: any) => {}) => {
    return axiosPost.then((res: AxiosResponse) => {
        setData(res.data);
    })
    .catch((err: any) => {
        setError(err?.message + ": " + (err?.response?.data?.message ?? ''));
    })
    .finally(() => {
        setLoading(false);
    })
}