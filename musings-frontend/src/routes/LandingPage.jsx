import React from 'react'
import { Link as RRLink } from 'react-router-dom'
import { Heading, Text, Button, Link as ChakraLink } from '@chakra-ui/react'
const LandingPage = () => {
  return (
    <div className='page' style={{
        paddingTop : "14rem"
    }}>
        <Heading size="3xl">Starting new projects, made more productive.</Heading>
        <Text fontSize="2xl" marginTop="1.5rem" marginBottom="1rem">Muse, list out your learnings and plan your objectives.</Text>
        <Button as={RRLink} to="/login" colorScheme="primary" variant="solid" marginBottom="1rem">Get Started</Button>
        <ChakraLink as={RRLink} to="/register" color="teal.500">Register first</ChakraLink>
    </div>
  )
}

export default LandingPage
