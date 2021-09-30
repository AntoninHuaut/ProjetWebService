import axios from "axios";
import { Publisher } from "../types/library";
import { API_LIBRARY } from "./axiosUtils";


const publisherURL : string =  API_LIBRARY + "/publisher"

export const getPublisherList = () => {
    return axios.get(`${publisherURL}/`);
}

export const updatePublisher = (publisher: Publisher) => {
    return axios.put(`${publisherURL}/`, publisher);
}

export const addPublisher = (publisher: Publisher) => {
    return axios.post(`${publisherURL}/`, publisher);
}

export const deletePublisher = (publisherId: number) => {
    return axios.delete(`${publisherURL}/${publisherId}`);
}

export const getPublisherById = (publisherId: number) => {
    return axios.get(`${publisherURL}/${publisherId}`);
}