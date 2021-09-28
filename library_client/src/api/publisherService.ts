import axios from "axios";
import { Publisher } from "../types/library";
import { API_URL } from "./axiosUtils";


const publisherURL : string =  API_URL + "/publisher"

export const getPublisherList = () => {
    return axios.get(`${publisherURL}/`);
}

export const updatePublisher = (publisher: Publisher) => {
    return axios.put(`${publisherURL}/`, publisher);
}

export const addPublisher = (publisher: Publisher) => {
    return axios.post(`${publisherURL}/`, publisher);
}