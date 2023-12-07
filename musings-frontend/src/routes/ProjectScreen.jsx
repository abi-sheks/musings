import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link as RRLink } from 'react-router-dom'
import { useBoards, useCreateBoard, useUpdateBoard, useDeleteBoard } from '../requests/board'
import { useProject, useDeleteProject, useUpdateProject } from '../requests/project'
import { useTasks } from '../requests/task'
import { AddIcon, ArrowBackIcon, DeleteIcon } from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter, Flex, Button, Heading, IconButton, Editable, EditableInput, EditablePreview, Text, useToast } from "@chakra-ui/react"
import { ItemTypes } from '../constants/dnd'
import { CreateTaskModal, TaskDisplayModal, BoardCard } from '../components'
import { errorToast, successToast } from '../components/Toasts'

const ProjectScreen = () => {
    const params = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const projectID = params.projectID
    const { boards, isLoading: boardsLoading, error: boardsError } = useBoards()
    const { tasks, isLoading: tasksLoading, error: tasksError } = useTasks()

    //had to jump through a lot of hoops cause of this stupid call, but extend this to task interface as well
    const { project, isLoading: projectLoading, error: projectError } = useProject(projectID)

    const { projectDeleter, projectDeleting } = useDeleteProject()
    const { projectUpdater, projectUpdating } = useUpdateProject()
    const { boardCreating, boardCreator } = useCreateBoard()
    const { boardUpdating, boardUpdater } = useUpdateBoard()
    const { boardDeleting, boardDeleter } = useDeleteBoard()
    const [projectTitle, setProjectTitle] = useState("")

    useEffect(() => {
        !projectLoading && setProjectTitle(project.project[0].title)
    }, [projectLoading, project])



    const handleCreateBoard = async () => {
        try {
            const response = await boardCreator({ title: "New board", projectID: projectID })
            console.log(response)

        } catch (error) {
            errorToast(toast, error)
            console.log(error)
        }
    }

    const handleBoardChange = async (value, boardID) => {
        if (value === "") {
            throw new Error("Value required")
        }
        try {
            const response = await boardUpdater({ title: value, projectID: projectID, itemID: boardID })
            console.log(response)


        } catch (error) {
            errorToast(toast, error)
            console.log(error)
        }
    }
    const handleBoardDelete = async (boardID) => {
        try {
            const response = await boardDeleter({ itemID: boardID })
            console.log(response)
        } catch (error) {
            errorToast(toast, error)
            console.log(error)
        }
    }

    const handleProjectChange = async (value) => {
        try {
            const response = await projectUpdater({ title: value, itemID: projectID, categoryID: project.project[0].categoryID })
            console.log(response)
            setProjectTitle(value)
        } catch (error) {
            errorToast(toast, error)
            console.log(error)
        }
    }
    const handleProjectDelete = async () => {
        try {
            const response = await projectDeleter({ itemID: projectID })
            console.log(response)
            navigate("/dashboard")
        } catch (error) {
            errorToast(toast, error)
            console.log(error)
        }
    }

    const boardsList = !boardsLoading && boards.boards.map(board => {
        if (board.projectID === projectID) {
            const tasksList = !tasksLoading && tasks.tasks.map(task => {
                if (task.boardID === board.boardID) {
                    return <TaskDisplayModal key={task.taskID} task={task} />
                }
            })
            return <BoardCard board={board}
                handleBoardDelete={handleBoardDelete}
                handleBoardChange={handleBoardChange}
                tasksList={tasksList}
                updateStatus={boardUpdating}
                deleteStatus={boardDeleting} />
        }
    })
    return (
        <div className='page' style={{ paddingTop: "2rem" }}>
            <Flex direction="row" width="90%" justify="space-between" align="center" marginBottom="1rem">
            <IconButton icon={<ArrowBackIcon />} colorScheme="teal" as={RRLink} to="/dashboard"/>
                <Editable value={projectTitle} textAlign="center" fontSize="5xl" fontWeight="bold" isDisabled={projectUpdating} onSubmit={handleProjectChange}>
                    <EditablePreview />
                    <EditableInput onChange={(e) => setProjectTitle(e.target.value)} />
                </Editable>
            <IconButton icon={<DeleteIcon />} colorScheme='teal' onClick={handleProjectDelete} />
            </Flex>
            <Flex width="100%" padding="2rem">
                {boardsList}
                <IconButton marginLeft="2rem" colorScheme="primary" icon={<AddIcon />} isLoading={boardCreating} onClick={() => handleCreateBoard(projectID)} />
            </Flex>
        </div>
    )
}

export default ProjectScreen
