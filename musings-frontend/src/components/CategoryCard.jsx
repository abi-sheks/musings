import React from 'react'
import { GridItem, Flex, Tooltip, Editable, EditableInput, EditablePreview, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import CreateProjectModal from './CreateProjectModal'

const CategoryCard = ({ category, handleCategoryChange, handleDeleteCategory, projectsList, updateStatus, deleteStatus }) => {
    return (
        <GridItem key={category.categoryID} bgColor="tertiary" borderRadius="1rem" padding="2rem" colSpan={1} maxWidth="24rem" minWidth="18rem">
            <Flex direction="row" justify="right">
                <Tooltip label="Delete category">
                    <IconButton icon={<DeleteIcon />} size="sm" isLoading={deleteStatus} colorScheme='teal' onClick={() => handleDeleteCategory(category.categoryID)} />
                </Tooltip>
            </Flex>
            <Editable defaultValue={category.title} textAlign="center" color="secondary" fontSize="3xl" fontWeight="bold" isDisabled={updateStatus} onSubmit={(value) => handleCategoryChange(value, category.categoryID)}>
                <EditablePreview />
                <EditableInput />
            </Editable>
            <Flex align="center" direction="column" marginTop="1rem">
                {projectsList}
                <CreateProjectModal category={category} />
            </Flex>
        </GridItem>
    )
}

export default CategoryCard
