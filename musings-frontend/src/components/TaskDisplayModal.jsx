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
    Flex
} from '@chakra-ui/react'

import { useUpdateTask, useDeleteTask } from '../requests/task'
import { useNotes, useCreateNote, useDeleteNote, useUpdateNote } from '../requests/note'
import { useNavigate } from 'react-router-dom'
import { DeleteIcon } from '@chakra-ui/icons'



const TaskDisplayModal = ({ task }) => {
    const navigate = useNavigate()
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
            console.log("value required")
            return;
        }
        try {
            const response = await noteCreator({ title: fieldState, taskID: task.taskID })
            setFieldState("")
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleTaskTitleChange = async (value) => {
        if (value === "") {
            console.log("value required")
            return;
        }
        try {
            const response = await taskUpdater({ title: value, boardID: task.boardID, projectID: task.projectID, itemID: task.taskID, completed : task.completed })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const handleTaskCompleteChange = async (e) => {
        try {
            const response = await taskUpdater({ title: task.title, boardID: task.boardID, projectID: task.projectID, itemID: task.taskID, completed : e.target.checked })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const handleNoteChange = async (value, note) => {
        if (value === "") {
            console.log("value required")
            return;
        }
        try {
            const response = await noteUpdater({ title: value, taskID: note.taskID, noteID: note.noteID, itemID: note.noteID })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    const handleTaskDelete = async () => {
        try {
            const response = await taskDeleter({ itemID: task.taskID })
            console.log(response)
            navigate(`/dashboard/projects/${task.projectID}`)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNoteDelete = async (noteID) => {
        try {
            const response = await noteDeleter({ itemID: noteID })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const notesList = !notesLoading && notes.notes.map(note => {
        if (note.taskID === task.taskID) {
            return (
                <div key={note.noteID}>
                    <Editable defaultValue={note.title} isDisabled={noteUpdating} onSubmit={(value) => handleNoteChange(value, note)}>
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <IconButton icon={<DeleteIcon />} onClick={() => handleNoteDelete(note.noteID)} colorScheme='primary' />
                </div>
            )
        }
    })
    return (
        <div style={{ marginTop: "1rem" }}>
            <Flex>
                <Link onClick={onOpen}>{task.title}</Link>
                <Checkbox isChecked={task.completed} onChange={handleTaskCompleteChange}></Checkbox>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent bg='secondary'>
                    <ModalHeader display="flex" justifyContent="space-between">
                        <Editable defaultValue={task.title} isDisabled={taskUpdating} onSubmit={(value) => handleTaskTitleChange(value)}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                        <IconButton icon={<DeleteIcon />} onClick={handleTaskDelete} colorScheme='primary' />
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Add notes</Text>
                        <Flex>
                            <Input type='text' value={fieldState} onChange={(e) => setFieldState(e.target.value)} />
                            <Button colorScheme='primary' onClick={handleCreateNote} isLoading={noteCreating}>Add</Button>
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
