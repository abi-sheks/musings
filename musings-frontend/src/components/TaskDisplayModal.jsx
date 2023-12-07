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
    Checkbox,
    Flex,
    Box,
    useToast
} from '@chakra-ui/react'

import { useUpdateTask, useDeleteTask } from '../requests/task'
import { useNotes, useCreateNote, useDeleteNote, useUpdateNote } from '../requests/note'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '@chakra-ui/icons'
import TaskPreview from './TaskPreview'
import { successToast, errorToast } from './Toasts'



const TaskDisplayModal = ({ task }) => {
    const navigate = useNavigate()
    const toast = useToast()
    const [fieldState, setFieldState] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { taskUpdater, taskUpdating } = useUpdateTask()
    const { taskDeleter, taskDeleting } = useDeleteTask()
    const { noteDeleter, noteDeleting } = useDeleteNote()
    const { notes, isLoading: notesLoading, error: notesError } = useNotes()
    const { noteCreator, noteCreating } = useCreateNote()
    const { noteUpdater, noteUpdating } = useUpdateNote()

    const handleCreateNote = async () => {
        if (fieldState === "") {
            throw new Error("Title required")
        }
        try {
            const response = await noteCreator({ title: fieldState, taskID: task.taskID })
            setFieldState("")
            console.log(response)
        }
        catch (error) {
            console.log(error)
            errorToast(toast, error)
        }
    }

    const handleTaskTitleChange = async (value) => {
        if (value === "") {
            throw new Error("Value required")
        }
        try {
            const response = await taskUpdater({ title: value, boardID: task.boardID, projectID: task.projectID, itemID: task.taskID, completed : task.completed })
            console.log(response)
        } catch (error) {
            errorToast(toast, error)
            console.log(error)
        }
    }
    const handleTaskCompleteChange = async (e) => {
        try {
            const response = await taskUpdater({ title: task.title, boardID: task.boardID, projectID: task.projectID, itemID: task.taskID, completed : e.target.checked })
            console.log(response)
        } catch (error) {
            console.log(error)
            errorToast(toast, error)

            
        }
    }
    const handleNoteChange = async (value, note) => {
        if (value === "") {
            throw new Error("Value required")
        }
        try {
            const response = await noteUpdater({ title: value, taskID: note.taskID, noteID: note.noteID, itemID: note.noteID })
            console.log(response)
        } catch (error) {
            console.log(error)
            errorToast(toast, error)
        }
    }
    const handleTaskDelete = async () => {
        try {
            const response = await taskDeleter({ itemID: task.taskID })
            console.log(response)
            successToast(toast, response)
            navigate(`/dashboard/projects/${task.projectID}`)
        } catch (error) {
            console.log(error)
            errorToast(toast, error)
        }
    }

    const handleNoteDelete = async (noteID) => {
        try {
            const response = await noteDeleter({ itemID: noteID })
            successToast(toast, response)
            console.log(response)
        } catch (error) {
            console.log(error)
            errorToast(toast, error)
        }
    }

    const notesList = !notesLoading && notes.notes.map(note => {
        if (note.taskID === task.taskID) {
            return (
                <Flex key={note.noteID} padding="0.5rem" marginTop="0.5rem" width="100%" align="center" justify="space-between">
                    <Editable defaultValue={note.title} flexGrow={0.8} isDisabled={noteUpdating} onSubmit={(value) => handleNoteChange(value, note)}>
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <IconButton  size="xs" icon={<DeleteIcon />} onClick={() => handleNoteDelete(note.noteID)} colorScheme='teal' />
                </Flex>
            )
        }
    })
    return (
        <div style={{ marginTop: "1rem" }}>
            <TaskPreview task={task} onOpen={onOpen} handleTaskCompleteChange={handleTaskCompleteChange} />
            <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="inside" colorScheme='gray'>
                <ModalOverlay />
                <ModalContent bg="bg">
                    <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
                        <Editable defaultValue={task.title} fontSize="3xl" isDisabled={taskUpdating} onSubmit={(value) => handleTaskTitleChange(value)}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                        <IconButton size="sm" icon={<DeleteIcon />} onClick={handleTaskDelete} colorScheme='primary' />
                    </ModalHeader>
                    <ModalBody>
                        <Text marginBottom="1rem" fontSize="xl">Add notes</Text>
                        <Flex marginBottom="2rem">
                            <Input autoFocus onKeyDown={async (event) => {if(event.key === "Enter") await handleCreateNote()}} type='text' variant="outlined" marginRight="1rem" value={fieldState} onChange={(e) => setFieldState(e.target.value)} />
                            <Button colorScheme='primary' onClick={handleCreateNote} isLoading={noteCreating}>Add</Button>
                        </Flex>
                        {notesList}
                    </ModalBody>
                    <ModalFooter>
                        <Button size="sm" colorScheme='primary' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default TaskDisplayModal
