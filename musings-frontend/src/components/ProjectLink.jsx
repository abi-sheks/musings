import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Link as RRLink } from 'react-router-dom'

const ProjectLink = ({ project }) => {
    return (
        <Box padding="0.5rem" borderRadius="0.5rem" margin="0.25rem" width="100%" bgColor="teal.700" className='hover-change' color="secondary" as={RRLink} to={`projects/${project.projectID}`}>
            <Text isTruncated>
                {project.title}
            </Text>
        </Box>
    )
}

export default ProjectLink
