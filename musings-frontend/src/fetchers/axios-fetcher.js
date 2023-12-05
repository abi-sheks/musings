import { getToken } from "../utils";
import axios from 'axios'

const fetcher = (url) =>
{
    const token = getToken()
    return axios
    .get(url, { headers: { Authorization: "Bearer " +  token} })
    .then((res) => res.data);
}

export default fetcher;