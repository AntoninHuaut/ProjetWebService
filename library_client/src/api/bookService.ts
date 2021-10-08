import axios from "axios";
import { Book } from "../types/library";
import { API_LIBRARY, getUserToken } from "./axiosUtils";


const bookURL : string =  API_LIBRARY + "/book"

export const getBookList = (title: string = "") => {
    return axios.get(`${bookURL}/?token=${getUserToken()}&title=${title}`);
}

export const updateBook = (book: Book) => {
    return axios.put(`${bookURL}/?token=${getUserToken()}`, book);
}

export const addBook = (book: Book) => {
    return axios.post(`${bookURL}/?token=${getUserToken()}`, book);
}

export const deleteBook = (bookId: number) => {
    return axios.delete(`${bookURL}/${bookId}?token=${getUserToken()}`);
}

export const getBookById = (bookId: number) => {
    return axios.get(`${bookURL}/${bookId}?token=${getUserToken()}`);
}