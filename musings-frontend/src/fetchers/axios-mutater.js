import { getToken } from "../utils";
import axios from 'axios'

const mutater = (url, { arg }) =>
{
    console.log(`The received arg is ${arg.title}`)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiYTU0NjhmLTQ2YzItNDdjYy05NDMxLWE0NTk2ZWU1ODM5YyIsInVzZXJuYW1lIjoiYWJpc2hlazEyMyIsImlhdCI6MTcwMTcxOTgxNX0.rifsf1ote0kLWksMt2mAyhfAUleNVw8a5x4GVxI9C5o"
    return axios
    .post(url, JSON.stringify({title : arg.title}) ,{ headers: { Authorization: "Bearer " +  token, "Content-Type" : "application/json"} })
    .then((res) => res.data);
}

export default mutater;