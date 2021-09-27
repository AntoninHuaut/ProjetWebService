import axios from "axios";

export const API_URL = "https://ensiws.maner.fr/library";

export const axiosExecuteGet = (axiosGet: any, setData: any, setLoading: any, setError: any) => {
    return axiosGet.then((res: any) => {
        setData(res.data);
    })
    .catch((err: string) => {
        setError(err);
    })
    .finally(() => {
        setLoading(false);
    })
}