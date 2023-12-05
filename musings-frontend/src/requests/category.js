import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const useCategories = () =>
{
    const {data, error, isLoading} = useSWR("http://localhost:8000/api/categories/", fetcher)
    return {
        categories : data,
        error,
        isLoading
    }
}

export const useCreateCategory = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/categories/", creator)
    return {
        categoryCreator : trigger,
        categoryCreating : isMutating
    }
}

