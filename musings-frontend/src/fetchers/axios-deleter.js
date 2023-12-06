import { getToken } from "../utils";
import axios from 'axios'

const deleter = (url, { arg }) =>
{
    //itemID is expected in args
    const token = getToken()
    //should not be possible anyways
    if(!arg.itemID)
    {
        arg.itemID = ""
    }
    return axios
    .delete(`${url}${arg.itemID}`, { headers: { Authorization: "Bearer " +  token} })
    .then((res) => res.data);
}

export default deleter;