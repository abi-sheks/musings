import React, { useState } from 'react'
import { Link as RRLink } from 'react-router-dom'
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../requests/category'
import { useProjects } from '../requests/project'
import { DeleteIcon } from '@chakra-ui/icons'
import { Heading, Button, Grid, GridItem, Flex, IconButton, Input, Link, Editable, EditablePreview, EditableInput, Tooltip } from '@chakra-ui/react'
import { CreateProjectModal } from '../components'

const Dashboard = () => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { categories, error: categoryError, isLoading: categoryLoading } = useCategories()
  const { projects, error: projectError, isLoading: projectLoading } = useProjects()
  const { categoryCreator, categoryCreating } = useCreateCategory()
  const { categoryUpdater, categoryUpdating } = useUpdateCategory()
  const { categoryDeleter, categoryDeleting } = useDeleteCategory()

  const [titleState, setTitleState] = useState("")

  //handler
  const handleCreateCategory = async () => {
    try {
      if (titleState === "") {
        console.log("enter title")
        return;
      }
      const result = await categoryCreator({ title: titleState })
      console.log(result)
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleCategoryChange = async (value, categoryID) => {
    if (value === "") {
      console.log("value required")
      return;
    }
    try {
      const response = await categoryUpdater({ title: value, itemID: categoryID })
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteCategory = async (categoryID) => {
    try {
      const response = await categoryDeleter({ itemID: categoryID })
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }

  //transfer to utils
  const categoryList = !categoryLoading && categories.categories.map(category => {
    const projectsList = !projectLoading && projects.projects.map(project => {
      if (project.categoryID === category.categoryID) {
        return (
          <Link color="secondary" as={RRLink} to={`projects/${project.projectID}`}>
            {project.title}
          </Link>
        )
      }
    })
    return (
      <GridItem key={category.categoryID} bgColor="tertiary" borderRadius="1rem" padding="1rem" colSpan={1}>
        <Flex direction="row" justify="right">
          <Tooltip label="Delete category">
            <IconButton icon={<DeleteIcon />} isLoading={categoryDeleting} colorScheme='teal' onClick={() => handleDeleteCategory(category.categoryID)} />
          </Tooltip>
        </Flex>
        <Editable defaultValue={category.title} textAlign="center" color="secondary" fontSize="3xl" fontWeight="bold" isDisabled={categoryUpdating} onSubmit={(value) => handleCategoryChange(value, category.categoryID)}>
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Flex align="center" direction="column">
          {projectsList}
          <CreateProjectModal category={category} />
        </Flex>
      </GridItem>
    )
  })


  return (
    <div className='page' style={{ paddingTop: '2rem', paddingLeft: '2rem', paddingRight: "2rem" }}>
      <Flex direction="column" align="center" justify="space-between">
        <Input value={titleState} onChange={(e) => setTitleState(e.target.value)} type='text' bgColor="secondary" size="sm" />
        <Button colorScheme="primary" onClick={handleCreateCategory} isLoading={categoryCreating} marginTop="1rem">Start a new category</Button>
      </Flex>
      <Heading marginTop='1rem'>Your projects</Heading>
      <Grid
        marginTop='2rem'
        width='100%'
        flexGrow={1}
        templateColumns='repeat(4, 1fr)'
        gap={6}
      >
        {categoryList}
      </Grid>
    </div>
  )
}

export default Dashboard
