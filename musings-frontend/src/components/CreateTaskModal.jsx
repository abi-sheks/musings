import React, { useState } from 'react'
import {
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Input,
    useToast
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useCreateTask } from '../requests/task'
import { errorToast, successToast } from './Toasts'


const CreateTaskModal = ({ boardID, projectID }) => {
    const [titleState, setTitleState] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {taskCreating, taskCreator} = useCreateTask()

    const toast = useToast()

    const handleCreateTask = async () => {
        if (titleState === "") {
            throw new Error("Enter title")
        }
        try {
            const result = await taskCreator({ title: titleState, projectID : projectID, boardID : boardID, completed : false})
            console.log(result)
            successToast(toast, result)
            setTitleState("")
            onClose()
        }
        catch (error) {
            errorToast(toast, error)
            console.log(error)
        }

    }
    return (
        <div style={{ marginTop: "1rem" }}>
            <Button colorScheme='teal' variant="solid" onClick={onOpen}>Add task</Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent bg='secondary'>
                    <ModalHeader>Create a task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Give your task a name</Text>
                        <Input autoFocus onKeyDown={async (event) => {if(event.key === "Enter") await handleCreateTask()}} type='text' value={titleState} onChange={(e) => setTitleState(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='primary' variant='solid' mr={3} onClick={handleCreateTask} isLoading={taskCreating}>
                            Create
                        </Button>
                        <Button colorScheme='primary' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreateTaskModal