import axios, { AxiosResponse } from "axios";
import { LoginUserDto, UserRole, RegisterUserDto } from "../types/login";
import { API_USER } from "./axiosUtils";

const userURL : string =  API_USER + "/user";
const testAdminToken : string = "7880a4cd-d85b-44e2-9781-cf001a8d8e17";

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
  
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }

}

export const login = (loginInfo : LoginUserDto) => {
    axios.post(`${API_USER}/access/login`, loginInfo).then((response: AxiosResponse) => {

        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;

    });
} 

export const register = (registerInfo : RegisterUserDto) => {
  axios.post(`${userURL}/?token=${testAdminToken}`, registerInfo).then((response: AxiosResponse) => {
      return response.data;
  });
} 