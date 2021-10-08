import axios, { AxiosResponse } from "axios";
import userActions from "../reducers/userActions";
import { LoginUserDto, RegisterUserDto, User } from "../types/login";
import { API_USER, getUserToken } from "./axiosUtils";

const userURL : string = API_USER + "/user";
const accessURL: string = API_USER + "/access";
const testAdminToken : string = process.env.REACT_APP_ADMIN_TOKEN ?? '';

export const haveLocalUser = (): boolean => {
    const user: User = JSON.parse(localStorage.getItem('user') ?? '{}');
    return user && user.token != ""
}

export const getLocalUser = (): User => {
    const user: User = JSON.parse(localStorage.getItem('user') ?? '{}');

    return user;
}

export const logout = (history: any, dispatch: any) => {
    const token = getLocalUser().token;
    if (!token) return;

    axios.delete(`${accessURL}/logout/${token}`)
    .catch((err: any) => {})
    .finally(() => {
        localStorage.removeItem("user");
        dispatch(userActions.logOut());
        history.push("/login");
    });
}


export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  
    if (user && user.token) {
      return { 'x-access-token': user.token };
    } else {
      return {};
    }

}

export const login = (loginInfo : LoginUserDto, dispatch: any) => {
    return axios.post(`${accessURL}/login`, loginInfo).then((response: AxiosResponse) => {

        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch(userActions.setUser(response.data));
        }

        return response.data;

    });
}

export const updateUser = (user: User) => {
    return axios.put(`${userURL}/?token=${getUserToken()}`, user);
}

export const deleteUser = (userId: number) => {
    return axios.delete(`${userURL}/${userId}?token=${getUserToken()}`);
}

export const getUserList = (name: string = "") => {
    return axios.get(`${userURL}/?token=${getUserToken()}&name=${name}`);
}

export const register = (registerInfo : RegisterUserDto) => {
    return axios.post(`${userURL}/?token=${testAdminToken}`, registerInfo).then((response: AxiosResponse) => {
        return response.data;
    });
} 