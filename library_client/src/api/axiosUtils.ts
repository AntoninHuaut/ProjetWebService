import { AxiosError, AxiosResponse } from "axios";

export const BASE_URL = "https://ensiws.maner.fr";
export const API_LIBRARY = `${BASE_URL}/library`;
export const API_USER = `${BASE_URL}/user`;

export const axiosExecuteGet = (axiosGet: any, setData: any, setLoading: any, setError: any) => {
    return axiosGet.then((res: AxiosResponse) => {
        setData(res.data);
    })
    .catch((err: Error | AxiosError) => {
        setError(err.message);
    })
    .finally(() => {
        setLoading(false);
    })
}

export const axiosExecutePost = (axiosPost: any, setLoading: any, setError: any, setData: any = (data: any) => {}) => {
    return axiosPost.then((res: AxiosResponse) => {
        setData(res.data);
    })
    .catch((err: Error | AxiosError) => {
        setError(err.message);
    })
    .finally(() => {
        setLoading(false);
    })
}