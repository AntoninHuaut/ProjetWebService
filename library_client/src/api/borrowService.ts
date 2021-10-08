import axios from "axios";
import { Borrow } from "../types/library";
import { API_LIBRARY, getUserToken } from "./axiosUtils";


const borrowURL : string =  API_LIBRARY + "/borrow"

export const getBorrowList = () => {
    return axios.get(`${borrowURL}/?token=${getUserToken()}`);
}

export const updateBorrow = (borrow: Borrow) => {
    return axios.put(`${borrowURL}/?token=${getUserToken()}`, borrow);
}

export const addBorrow = (borrow: Borrow) => {
    return axios.post(`${borrowURL}/?token=${getUserToken()}`, borrow);
}

export const deleteBorrow = (borrowId: number) => {
    return axios.delete(`${borrowURL}/${borrowId}?token=${getUserToken()}`);
}

export const getBorrowById = (borrowId: number) => {
    return axios.get(`${borrowURL}/${borrowId}?token=${getUserToken()}`);
}