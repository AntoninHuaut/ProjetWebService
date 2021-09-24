import axios from "axios";

export const axiosExecute = (axiosGet: any, setData: any, setLoading: any, setError: any) => {
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