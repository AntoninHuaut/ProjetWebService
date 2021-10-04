import axios from "axios";
import { Publisher } from "../types/library";
import { API_LIBRARY, getUserToken } from "./axiosUtils";


const publisherURL : string =  API_LIBRARY + "/publisher"

export const getPublisherList = () => {
    return axios.get(`${publisherURL}/?token=${getUserToken()}`);
}

export const updatePublisher = (publisher: Publisher) => {
    return axios.put(`${publisherURL}/?token=${getUserToken()}`, publisher);
}

export const addPublisher = (publisher: Publisher) => {
    return axios.post(`${publisherURL}/?token=${getUserToken()}`, publisher);
}

export const deletePublisher = (publisherId: number) => {
    return axios.delete(`${publisherURL}/${publisherId}?token=${getUserToken()}`);
}

export const getPublisherById = (publisherId: number) => {
    return axios.get(`${publisherURL}/${publisherId}?token=${getUserToken()}`);
}