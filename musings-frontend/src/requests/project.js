import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import useSWR from 'swr'
import useSWRMutation from "swr/mutation"


export const useProjects = () =>
{
    const {data, error, isLoading} = useSWR("http://localhost:8000/api/projects/", fetcher)
    return {
        projects : data,
        error,
        isLoading
    }
}

export const useCreateProject = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/projects/", creator)
    return {
        projectCreator : trigger,
        projectCreating : isMutating
    }
}
