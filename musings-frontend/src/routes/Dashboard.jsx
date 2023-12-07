import React, { useState } from 'react'
import { Link as RRLink, useNavigate } from 'react-router-dom'
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../requests/category'
import { useProjects } from '../requests/project'
import { DeleteIcon } from '@chakra-ui/icons'
import { Heading, Button, Grid, Flex, Input, useToast } from '@chakra-ui/react'
import { CategoryCard, ProjectLink } from '../components'
import { errorToast, successToast } from '../components/Toasts'

const Dashboard = () => {
  const { categories, error: categoryError, isLoading: categoryLoading } = useCategories()
  const { projects, error: projectError, isLoading: projectLoading } = useProjects()
  const { categoryCreator, categoryCreating } = useCreateCategory()
  const { categoryUpdater, categoryUpdating } = useUpdateCategory()
  const { categoryDeleter, categoryDeleting } = useDeleteCategory()

  const toast = useToast()
  const navigate = useNavigate()

  const [titleState, setTitleState] = useState("")

  //handler
  const handleLogout = async () => {
    localStorage.setItem("token", "")
    localStorage.setItem("username", "")
    navigate("/")
  }
  const handleCreateCategory = async () => {
    try {
      if (titleState === "") {
        throw new Error("Enter a title")
      }
      const result = await categoryCreator({ title: titleState })
      setTitleState("")
      successToast(toast, result)
      console.log(result)
    }
    catch (error) {
      errorToast(toast, error)
      console.log(error)
    }
  }

  const handleCategoryChange = async (value, categoryID) => {
    try {
      if (value === "") {
        throw new Error("Value required")
      }
      const response = await categoryUpdater({ title: value, itemID: categoryID })
      console.log(response)

    } catch (error) {
      errorToast(toast, error)
      console.log(error)
    }
  }

  const handleDeleteCategory = async (categoryID) => {
    try {
      const response = await categoryDeleter({ itemID: categoryID })
      console.log(response)

    } catch (error) {
      errorToast(toast, error)
      console.log(error)
    }
  }

  //transfer to utils
  const categoryList = !categoryLoading && categories.categories.map(category => {
    const projectsList = !projectLoading && projects.projects.map(project => {
      if (project.categoryID === category.categoryID) {
        return (
          <ProjectLink project={project} />
        )
      }
    })
    return (
      <CategoryCard category={category} handleCategoryChange={handleCategoryChange} handleDeleteCategory={handleDeleteCategory} projectsList={projectsList} updateStatus={categoryUpdating} deleteStatus={categoryDeleting} />
    )
  })


  return (
    <div className='page' style={{ paddingTop: '2rem', paddingLeft: '2rem', paddingRight: "2rem" }}>
      <Flex direction="column" align="center" justify="space-between">
        <Input onKeyDown={async (event) => { if (event.key === "Enter") await handleCreateCategory() }} value={titleState} onChange={(e) => setTitleState(e.target.value)} type='text' bgColor="secondary" size="sm" />
        <Button colorScheme="primary" onClick={handleCreateCategory} isLoading={categoryCreating} marginTop="1rem">Start a new category</Button>
      </Flex>
      <Heading marginTop='1rem'>Your projects, categorized.</Heading>
      <Grid
        marginTop='2rem'
        width='100%'
        flexGrow={1}
        templateColumns='repeat(4, 1fr)'
        gap={6}
      >
        {categoryList}
      </Grid>
      <Button position="absolute" top="2rem" left="2rem" colorScheme='primary' variant="solid" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Dashboard
