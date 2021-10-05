import axios, { AxiosResponse } from "axios";
import { LoginUserDto, UserRole, RegisterUserDto, User } from "../types/login";
import { API_USER } from "./axiosUtils";

const userURL : string =  API_USER + "/user";
const testAdminToken : string = process.env.REACT_APP_ADMIN_TOKEN ?? '';

export const isConnected = (): boolean => {
    let userStr = localStorage.getItem('user');
    
    let user: User | null = userStr !== "" && userStr !== null ? JSON.parse(userStr) : null;

    return user !== null && user.token !== null && user.token !== "";
}

export const logout = (history: any) => {
    localStorage.removeItem("user");
    history.push("/login");
}


export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
  
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }

}

export const login = (loginInfo : LoginUserDto) => {
    return axios.post(`${API_USER}/access/login`, loginInfo).then((response: AxiosResponse) => {

        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;

    });
} 

export const register = (registerInfo : RegisterUserDto) => {
    return axios.post(`${userURL}/?token=${testAdminToken}`, registerInfo).then((response: AxiosResponse) => {
        return response.data;
    });
} 