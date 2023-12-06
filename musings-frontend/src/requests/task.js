import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import updater from "../fetchers/axios-updater"
import deleter from "../fetchers/axios-deleter"
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'



export const useTasks= () =>
{
    const {data, error, isLoading} = useSWR(`http://localhost:8000/api/tasks/`, fetcher)
    return {
        tasks : data,
        error,
        isLoading
    }
}
export const useTask= (taskID) =>
{
    const {data, error, isLoading} = useSWR(`http://localhost:8000/api/tasks/${taskID}`, fetcher)
    return {
        task : data,
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
export const useDeleteTask = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/tasks/", deleter)
    return {
        taskDeleter : trigger,
        taskDeleting : isMutating
    }
}
