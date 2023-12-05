import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import updater from "../fetchers/axios-updater"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'


//tasks and notes are nested routes on the backend. So itemID will be of the form :boardID/tasks/:taskID

export const useTasks= () =>
{
    const {data, error, isLoading} = useSWR(`http://localhost:8000/api/tasks/`, fetcher)
    return {
        tasks : data,
        error,
        isLoading
    }
}

//itemID - /:boardID/tasks
//projectID expected in body
export const useCreateTask = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/tasks/", creator)
    return {
        taskCreator : trigger,
        taskCreating : isMutating
    }
}

//itemID - /:boardID/tasks/:taskID
//projectID expected in body
export const useUpdateTask = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/tasks/", updater)
    return {
        taskUpdater : trigger,
        taskUpdating : isMutating
    }
}
