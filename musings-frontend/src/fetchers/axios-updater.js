import { getToken } from "../utils";
import axios from 'axios'

const updater = (url, { arg }) =>
{
    //itemID is expected in args
    const token = getToken()
    //should not be possible anyways
    if(!arg.itemID)
    {
        arg.itemID = ""
    }
    return axios
    .put(`${url}${arg.itemID}`, JSON.stringify(arg) ,{ headers: { Authorization: "Bearer " +  token, "Content-Type" : "application/json"} })
    .then((res) => res.data);
}

export default updater;