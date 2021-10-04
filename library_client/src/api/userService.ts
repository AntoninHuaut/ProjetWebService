import axios, { AxiosResponse } from "axios"
import { LoginUserDto } from "../types/login"
import { API_USER } from "./axiosUtils"

const userURL : string =  API_USER + "/user"

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
  
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }

}

export const login = (loginInfo : LoginUserDto) => {
    axios.post(`${userURL}/login`, loginInfo).then((response: AxiosResponse) => {

        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;

    });
} 