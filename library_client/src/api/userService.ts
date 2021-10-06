import axios, { AxiosResponse } from "axios";
import userActions from "../reducers/userActions";
import { LoginUserDto, RegisterUserDto, User } from "../types/login";
import { API_USER, getUserToken } from "./axiosUtils";

const userURL : string =  API_USER + "/user";
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
    localStorage.removeItem("user");
    dispatch(userActions.logOut());
    history.push("/login");
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
    return axios.post(`${API_USER}/access/login`, loginInfo).then((response: AxiosResponse) => {

        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            dispatch(userActions.setUser(response.data));
        }

        return response.data;

    });
}

export const updateUser = (user: User) => {
    return axios.put(`${userURL}/?token=${testAdminToken}`, user);
}

export const deleteUser = (userId: number) => {
    return axios.delete(`${userURL}/${userId}?token=${testAdminToken}`);
}

export const getUserList = () => {
    return axios.get(`${userURL}/?token=${getUserToken()}`);
}

export const register = (registerInfo : RegisterUserDto) => {
    return axios.post(`${userURL}/?token=${testAdminToken}`, registerInfo).then((response: AxiosResponse) => {
        return response.data;
    });
} 