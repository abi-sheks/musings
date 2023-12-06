import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import updater from "../fetchers/axios-updater"
import deleter from "../fetchers/axios-deleter"
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

export const useUpdateCategory = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/categories/", updater)
    return {
        categoryUpdater : trigger,
        categoryUpdating : isMutating
    }
}

export const useDeleteCategory = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/categories/", deleter)
    return {
        categoryDeleter : trigger,
        categoryDeleting : isMutating
    }
}


