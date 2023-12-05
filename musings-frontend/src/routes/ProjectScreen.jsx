import React from 'react'
import { useParams } from 'react-router-dom'
import { useBoards, useCreateBoard, useUpdateBoard } from '../requests/board'
import { useTasks} from '../requests/task'
import { AddIcon } from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter, Flex, Button, IconButton, Editable, EditableInput, EditablePreview, Text } from "@chakra-ui/react"
import { CreateTaskModal } from '../components'

const ProjectScreen = () => {
    const params = useParams()
    const projectID = params.projectID
    const { boards, isLoading, error } = useBoards()
    const { boardCreating, boardCreator } = useCreateBoard()
    const { boardUpdating, boardUpdater } = useUpdateBoard()
    const { tasks, isLoading: tasksLoading, error: tasksErrored } = useTasks()



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

    const boardsList = !isLoading && boards.boards.map(board => {
        if (board.projectID === projectID) {
            const tasksList = !tasksLoading && tasks.tasks.map(task => {
                if (task.boardID === board.boardID) {
                    console.log("hit")
                    return (
                        <Text key={task.taskID}>
                            {task.title}
                        </Text>
                    )
                }
            })
            return (
                <Card key={board.boardID} bgColor="primary.600">
                    <CardHeader>
                        <Editable defaultValue={board.title} isDisabled={boardUpdating} onSubmit={(value) => handleBoardChange(value, board.boardID)}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
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
            <Flex width="100%" padding="2rem">
                {boardsList}
                <IconButton colorScheme="primary" icon={<AddIcon />} isLoading={boardCreating} onClick={handleCreateBoard} />
            </Flex>
        </div>
    )
}

export default ProjectScreen
