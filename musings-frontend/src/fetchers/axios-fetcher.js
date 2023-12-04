import { getToken } from "../utils";
import axios from 'axios'

const fetcher = (url) =>
{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiYTU0NjhmLTQ2YzItNDdjYy05NDMxLWE0NTk2ZWU1ODM5YyIsInVzZXJuYW1lIjoiYWJpc2hlazEyMyIsImlhdCI6MTcwMTcxOTgxNX0.rifsf1ote0kLWksMt2mAyhfAUleNVw8a5x4GVxI9C5o"
    return axios
    .get(url, { headers: { Authorization: "Bearer " +  token} })
    .then((res) => res.data);
}

export default fetcher;