import axios from "axios";
import { Author } from "../types/library";
import { API_LIBRARY, getUserToken } from "./axiosUtils";


const authorURL : string =  API_LIBRARY + "/author"

export const getAuthorList = (name : string = "") => {
    return axios.get(`${authorURL}/?token=${getUserToken()}&name=${name}`);
}

export const updateAuthor = (author: Author) => {
    return axios.put(`${authorURL}/?token=${getUserToken()}`, author);
}

export const addAuthor = (author: Author) => {
    return axios.post(`${authorURL}/?token=${getUserToken()}`, author);
}

export const deleteAuthor = (authorId: number) => {
    return axios.delete(`${authorURL}/${authorId}?token=${getUserToken()}`);
}

export const getAuthorById = (authorId: number) => {
    return axios.get(`${authorURL}/${authorId}?token=${getUserToken()}`);
}