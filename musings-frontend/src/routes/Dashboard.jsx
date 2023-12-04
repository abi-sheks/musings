import React, { useState } from 'react'
import { useCategories, useCreateCategory } from '../requests/category'
import { useProjects } from '../requests/project'
import { Heading, Button, Grid, GridItem, Flex, Text, Input, Container } from '@chakra-ui/react'

const Dashboard = () => {
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { categories, error: categoryError, isLoading: categoryLoading } = useCategories()
  const { categoryCreator, categoryCreating } = useCreateCategory()
  const { projects, error: projectError, isLoading: projectLoading } = useProjects()

  const [titleState, setTitleState] = useState("")

  console.log(categories)
  console.log(projects)

  //transfer to utils
  const categoryList = !categoryLoading && categories.categories.map(category => {
    const projectsList = !projectLoading && projects.projects.map(project => {
      if (project.categoryID === category.categoryID) {
        return (
          <Text>
            {project.title}
          </Text>
        )
      }
    })
    return (
      <GridItem key={category.id} bgColor="tertiary" borderRadius="1rem" padding="1rem">
        <Heading textAlign="center" color="secondary">{category.title}</Heading>
        <Flex>
          {projectsList}
        </Flex>
      </GridItem>
    )
  })
  //handler
  const handleCreate = async () => {
    try {
      console.log(titleState)
      const result = await categoryCreator({ title: titleState })
      console.log(result)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='page' style={{ paddingTop: '8rem' }}>
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
