import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, Text, Button } from '@chakra-ui/react'
const LandingPage = () => {
  return (
    <div className='page' style={{
        paddingTop : "14rem"
    }}>
        <Heading size="3xl">Starting new projects, made more productive.</Heading>
        <Text fontSize="2xl" marginTop="1.5rem" marginBottom="1rem">Muse, list out your learnings and plan your objectives.</Text>
        <Button as={Link} to="/dashboard" colorScheme="primary" variant="solid">Get Started</Button>
    </div>
  )
}

export default LandingPage
