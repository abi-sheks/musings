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
    Link,
    Editable,
    EditablePreview,
    EditableInput,
    Flex
} from '@chakra-ui/react'

import { useUpdateTask } from '../requests/task'
import { useNotes, useCreateNote } from '../requests/note'



const TaskDisplayModal = ({ task, boardID, projectID }) => {
    const [fieldState, setFieldState] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {taskUpdater, taskUpdating} = useUpdateTask()
    const {notes, isLoading, error} = useNotes()
    const {noteCreator, noteCreating} = useCreateNote()


    const handleTaskChange = async (value) => {
        if (value === "") {
            console.log("value required")
            return;
        }
        try {
            const response = await taskUpdater({ title: value, projectID: projectID, boardID: boardID, itemID : task.taskID })
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateNote = async () => {
        if(fieldState === "")
        {
            console.log("value required")
            return;
        }
        try
        {
            const response = await noteCreator({title : fieldState, taskID : task.taskID})
            setFieldState("")
            console.log(response)
        }
        catch(error)
        {
            console.log(error)
        }
    } 

    const notesList = !isLoading && notes.notes.map(note => {
        if(note.taskID === task.taskID)
        {
            return (
                <Text key={note.noteID}>
                    {note.title}
                </Text>
            )
        }
    })
    return (
        <div style={{ marginTop: "1rem" }}>
            <Link onClick={onOpen}>{task.title}</Link>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent bg='secondary'>
                    <ModalHeader>
                    <Editable defaultValue={task.title} isDisabled={taskUpdating} onSubmit={handleTaskChange}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Add notes</Text>
                        <Flex>
                        <Input type='text' value={fieldState} onChange={(e) => setFieldState(e.target.value)} />
                        <Button colorScheme='primary' onClick={handleCreateNote}>Add</Button>
                        </Flex>
                        {notesList}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='primary' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TaskDisplayModal
