import fetcher from "../fetchers/axios-fetcher"
import creator from "../fetchers/axios-creator"
import deleter from "../fetchers/axios-deleter"
import updater from "../fetchers/axios-updater"
import { compareID } from "../utils"
import useSWR from 'swr'
import useSWRMutation from "swr/mutation"

//philosophy behind requiring itemID for update and delete operations everywhere, but url manipulations for retrieve, is because this ensures swr key for update/delete/list/create remains same, minimizing the amount of manual cache revalidation logic i have to write

export const useProjects = () => {
    const { data, error, isLoading } = useSWR("http://localhost:8000/api/projects/", fetcher)
    !isLoading && data.projects.sort(compareID)
    return {
        projects: data,
        error,
        isLoading
    }
}
export const useProject = (projectID) => {
    const { data, error, isLoading } = useSWR("http://localhost:8000/api/projects/" + projectID, fetcher)
    return {
        project: data,
        error,
        isLoading
    }
}

export const useCreateProject = () => {
    const { trigger, isMutating } = useSWRMutation("http://localhost:8000/api/projects/", creator)
    return {
        projectCreator: trigger,
        projectCreating: isMutating
    }
}

export const useUpdateProject = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/projects/", updater)
    return {
        projectUpdater : trigger,
        projectUpdating : isMutating
    }
}

export const useDeleteProject = () => {
    const {trigger, isMutating} = useSWRMutation("http://localhost:8000/api/projects/", deleter)
    return {
        projectDeleter : trigger,
        projectDeleting : isMutating
    }
}
