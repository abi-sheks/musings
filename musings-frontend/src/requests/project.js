import fetcher from "../fetchers/axios-fetcher"
import useSWR from 'swr'


export const useProjects = () =>
{
    const {data, error, isLoading} = useSWR("http://localhost:8000/api/projects/", fetcher)
    return {
        projects : data,
        error,
        isLoading
    }
}
