import { getToken } from "../utils";
import axios from 'axios'


//note : retrieve requests fetch an array with only one element, not an entire array. common pitfall
const fetcher = (url) =>
{
    const token = getToken()
    return axios
    .get(url, { headers: { Authorization: "Bearer " +  token} })
    .then((res) => res.data);
}

export default fetcher;