import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import updater from "../fetchers/axios-updater"
import deleter from "../fetchers/axios-deleter"
import { compareID } from "../utils"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'


export const useBoards = () =>
{
    const {data, error, isLoading} = useSWR("http://localhost:8000/api/boards/", fetcher)
    !isLoading && data.boards.sort(compareID)
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
export const useDeleteBoard = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/boards/", deleter)
    return {
        boardDeleter : trigger,
        boardDeleting : isMutating
    }
}

