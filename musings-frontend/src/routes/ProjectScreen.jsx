import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useBoards, useCreateBoard, useUpdateBoard, useDeleteBoard } from '../requests/board'
import { useProject, useDeleteProject, useUpdateProject } from '../requests/project'
import { useTasks } from '../requests/task'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter, Flex, Button, Heading, IconButton, Editable, EditableInput, EditablePreview, Text } from "@chakra-ui/react"
import { ItemTypes } from '../constants/dnd'
import { CreateTaskModal, TaskDisplayModal } from '../components'

const ProjectScreen = () => {
    const params = useParams()
    const navigate = useNavigate()
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
            console.log(error)
        }
    }

    const handleBoardChange = async (value, boardID) => {
        if (value === "") {
            console.log("value required")
            return;
        }
        try {
            const response = await boardUpdater({ title: value, projectID: projectID, itemID: boardID })
            console.log(response)


        } catch (error) {
            console.log(error)
        }
    }
    const handleBoardDelete = async (boardID) => {
        try {
            const response = await boardDeleter({ itemID: boardID})
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleProjectChange = async (value) => {
        try {
            const response = await projectUpdater({title : value ,itemID: projectID, categoryID : project.project[0].categoryID })
            console.log(response)
            setProjectTitle(value)
        } catch (error) {
            console.log(error)
        }
    }
    const handleProjectDelete = async () => {
        try {
            const response = await projectDeleter({ itemID: projectID })
            console.log(response)
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    const boardsList = !boardsLoading && boards.boards.map(board => {
        if (board.projectID === projectID) {
            const tasksList = !tasksLoading && tasks.tasks.map(task => {
                if (task.boardID === board.boardID) {
                    return (
                        <TaskDisplayModal key={task.taskID} task={task}/>
                    )
                }
            })
            return (
                <Card key={board.boardID} bgColor="primary.600">
                    <CardHeader display="flex" justifyContent="space-between">
                        <Editable defaultValue={board.title} isDisabled={boardUpdating} onSubmit={(value) => handleBoardChange(value, board.boardID)}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                        <IconButton icon={<DeleteIcon />} onClick={() => handleBoardDelete(board.boardID)} colorScheme='teal'/>
                    </CardHeader>
                    <CardBody>
                        {tasksList}
                    </CardBody>
                    <CardFooter>
                        <CreateTaskModal boardID={board.boardID} projectID={projectID} />
                    </CardFooter>
                </Card>
            )
        }
    })
    return (
        <div className='page' style={{ paddingTop: "2rem" }}>
            <Flex direction="row" justify="center">
                <Editable value={projectTitle} textAlign="center" fontSize="5xl" fontWeight="bold" isDisabled={projectUpdating} onSubmit={handleProjectChange}>
                    <EditablePreview />
                    <EditableInput onChange={(e) => setProjectTitle(e.target.value)} />
                </Editable>
                <IconButton icon={<DeleteIcon />} colorScheme='teal' onClick={handleProjectDelete} />
            </Flex>
            <Flex width="100%" padding="2rem">
                {boardsList}
                <IconButton colorScheme="primary" icon={<AddIcon />} isLoading={boardCreating} onClick={() => handleCreateBoard(projectID)} />
            </Flex>
        </div>
    )
}

export default ProjectScreen
