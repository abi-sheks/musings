import fetcher from "../fetchers/axios-fetcher"
import mutater from "../fetchers/axios-mutater"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const useCategories = () =>
{
    const {data, error, isLoading} = useSWR("http://localhost:8000/api/categories/", fetcher)
    console.log(`fetched ${data}`)
    return {
        categories : data,
        error,
        isLoading
    }
}

export const useCreateCategory = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/categories/", mutater)
    return {
        categoryCreator : trigger,
        categoryCreating : isMutating
    }
}

