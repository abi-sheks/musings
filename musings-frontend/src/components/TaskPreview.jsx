import React from 'react'
import { Flex, Box, Text, Checkbox } from '@chakra-ui/react'

const TaskPreview = ({ task, onOpen, handleTaskCompleteChange }) => {
    return (
        <Flex width="100%" justify="space-between" padding="0.5rem" borderRadius="0.5rem" maxWidth="24rem" margin="0.25rem" bgColor="teal.700" className='hover-change' color="secondary">
            <Box flexGrow={0.9} maxWidth="18rem" onClick={onOpen}>
                <Text isTruncated>{task.title}</Text>
            </Box>
            <Checkbox isChecked={task.completed} onChange={handleTaskCompleteChange} onClick={event => event.stopPropagation()}></Checkbox>
        </Flex>
    )
}

export default TaskPreview
