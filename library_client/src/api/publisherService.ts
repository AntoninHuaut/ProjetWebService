import axios from "axios";
import { API_URL } from "./axiosUtils";


const publisherURL : string =  API_URL + "/publisher"

export const getPublisherList = () => {

    return axios.get(`${publisherURL}/`);

}