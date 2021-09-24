import axios from "axios";

const publisherURL : string = "/publisher"

export const getPublisherList = () => {

    return axios.get(`${publisherURL}/`);

}