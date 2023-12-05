import React, { useState } from 'react'
import { Link as RRLink } from 'react-router-dom'
import { useCategories, useCreateCategory } from '../requests/category'
import { useProjects } from '../requests/project'
import {AddIcon} from '@chakra-ui/icons'
import { Heading, Button, Grid, GridItem, Flex, Text, Input, Link } from '@chakra-ui/react'
import { CreateProjectModal } from '../components'

const Dashboard = () => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { categories, error: categoryError, isLoading: categoryLoading } = useCategories()
  const { categoryCreator, categoryCreating } = useCreateCategory()
  const { projects, error: projectError, isLoading: projectLoading } = useProjects()

  const [titleState, setTitleState] = useState("")

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
        <Heading textAlign="center" color="secondary" marginBottom="1rem">{category.title}</Heading>
        <Flex align="center" direction="column">
          {projectsList}
          <CreateProjectModal category={category}/>
        </Flex>
      </GridItem>
    )
  })
  //handler
  const handleCreate = async () => {
    try {
      if(titleState === "")
      {
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

  return (
    <div className='page' style={{ paddingTop: '2rem' }}>
      <Flex direction="column" align="center" justify="space-between">
      <Input value={titleState} onChange={(e) => setTitleState(e.target.value)} type='text' bgColor="secondary" size="sm"/>
      <Button colorScheme="primary" onClick={handleCreate} isLoading={categoryCreating} marginTop="1rem">Start a new category</Button>
      </Flex>
      <Heading marginTop='1rem'>Your projects</Heading>
      <Grid
        marginTop='2rem'
        width='100%'
        flexGrow={1}
        templateColumns='repeat(4, 1fr)'
        gap={4}
      >
        {categoryList}
      </Grid>
    </div>
  )
}

export default Dashboard
