import axios from "axios";
import { Book } from "../types/library";
import { API_LIBRARY } from "./axiosUtils";


const bookURL : string =  API_LIBRARY + "/book"

export const getBookList = () => {
    return axios.get(`${bookURL}/`);
}

export const updateBook = (book: Book) => {
    return axios.put(`${bookURL}/`, book);
}

export const addBook = (book: Book) => {
    return axios.post(`${bookURL}/`, book);
}

export const deleteBook = (bookId: number) => {
    return axios.delete(`${bookURL}/${bookId}`);
}

export const getBookById = (bookId: number) => {
    return axios.get(`${bookURL}/${bookId}`);
}