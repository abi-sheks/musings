import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import updater from "../fetchers/axios-updater"
import deleter from "../fetchers/axios-deleter"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'


//tasks and notes are nested routes on the backend. So itemID will be of the form :boardID/tasks/:taskID

export const useNotes= () =>
{
    const {data, error, isLoading} = useSWR(`http://localhost:8000/api/notes/`, fetcher)
    return {
        notes : data,
        error,
        isLoading
    }
}

export const useCreateNote = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/notes/", creator)
    return {
        noteCreator : trigger,
        noteCreating : isMutating
    }
}
export const useUpdateNote = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/notes/", updater)
    return {
        noteUpdater : trigger,
        noteUpdating : isMutating
    }
}
export const useDeleteNote = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/notes/", deleter)
    return {
        noteDeleter : trigger,
        noteDeleting : isMutating
    }
}
