import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import updater from "../fetchers/axios-updater"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const useBoards = () =>
{
    const {data, error, isLoading} = useSWR("http://localhost:8000/api/boards/", fetcher)
    return {
        boards : data,
        error,
        isLoading
    }
}

export const useCreateBoard = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/boards/", creator)
    return {
        boardCreator : trigger,
        boardCreating : isMutating
    }
}
export const useUpdateBoard = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/boards/", updater)
    return {
        boardUpdater : trigger,
        boardUpdating : isMutating
    }
}

