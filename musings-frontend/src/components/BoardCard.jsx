import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Editable,
    EditableInput,
    EditablePreview,
    IconButton,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import CreateTaskModal from './CreateTaskModal'

const BoardCard = ({board, handleBoardDelete, handleBoardChange, tasksList, updateStatus, deleteStatus}) => {
  return (
    <Card key={board.boardID} bgColor="tertiary" marginLeft="0.5rem" marginRight="0.5rem" maxWidth="24rem" minWidth="18rem">
    <CardHeader display="flex" justifyContent="space-between" width="100%" alignItems="center">
        <Editable defaultValue={board.title} fontWeight="500" color="secondary" fontSize="xl" isDisabled={updateStatus} onSubmit={(value) => handleBoardChange(value, board.boardID)}>
            <EditablePreview />
            <EditableInput />
        </Editable>
        <IconButton size="xs" isLoading={deleteStatus} icon={<DeleteIcon />} onClick={() => handleBoardDelete(board.boardID)} colorScheme='teal' />
    </CardHeader>
    <CardBody>
        {tasksList}
    </CardBody>
    <CardFooter display="flex" justifyContent="center">
        <CreateTaskModal boardID={board.boardID} projectID={board.projectID} />
    </CardFooter>
</Card>
  )
}

export default BoardCard
