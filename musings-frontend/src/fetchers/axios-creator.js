import { getToken } from "../utils";
import axios from 'axios'

const creator = (url, { arg }) =>
{
    const token = getToken()
    return axios
    .post(url, JSON.stringify(arg) ,{ headers: { Authorization: "Bearer " +  token, "Content-Type" : "application/json"} })
    .then((res) => res.data);
}

export default creator;