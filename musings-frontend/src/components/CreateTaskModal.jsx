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
    Input
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useCreateTask } from '../requests/task'


const CreateTaskModal = ({ boardID, projectID }) => {
    const [titleState, setTitleState] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {taskCreating, taskCreator} = useCreateTask()

    const handleCreateTask = async () => {
        if (titleState === "") {
            console.log("enter title")
            return;
        }
        try {
            const result = await taskCreator({ title: titleState, projectID : projectID, boardID : boardID})
            console.log(result)
            setTitleState("")
            onClose()
        }
        catch (error) {
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
                        <Input type='text' value={titleState} onChange={(e) => setTitleState(e.target.value)} />
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