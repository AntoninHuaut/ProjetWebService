import axios from "axios";
import { Author } from "../types/library";
import { API_LIBRARY } from "./axiosUtils";


const authorURL : string =  API_LIBRARY + "/author"

export const getAuthorList = () => {
    return axios.get(`${authorURL}/`);
}

export const updateAuthor = (author: Author) => {
    return axios.put(`${authorURL}/`, author);
}

export const addAuthor = (author: Author) => {
    return axios.post(`${authorURL}/`, author);
}

export const deleteAuthor = (authorId: number) => {
    return axios.delete(`${authorURL}/${authorId}`);
}

export const getAuthorById = (authorId: number) => {
    return axios.get(`${authorURL}/${authorId}`);
}