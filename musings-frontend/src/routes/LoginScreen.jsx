import React from 'react'
import { Card, CardHeader, CardBody, Input, Heading, Text, CardFooter, Button, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { errorToast, successToast } from '../components/Toasts'

const LoginScreen = () => {
  const [usernameState, setUsernameState] = useState("")  
  const [passwordState, setPasswordState] = useState("") 

  const navigate = useNavigate()
  const toast = useToast()
  
  const handleSubmit = async () => {
    try
    {
        if(!passwordState || !usernameState)
        {
            console.log("enter all")
            throw new Error("Please enter all your details")
        }
        const response = (await axios.post("http://localhost:8000/api/auth/login/", JSON.stringify({username : usernameState, password : passwordState}), {headers : {"Content-type" : "application/json"}})).data
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", response.user.username)
        navigate("/dashboard")
        successToast(toast, response)
    }
    catch(error)
    {
        console.log(error)
       errorToast(toast, error)
    }

  }


  return (
    <div className='page'>
      <Card backgroundColor="secondary" height="100%" width="60%">
        <CardHeader>
            <Heading textAlign="center">Login</Heading>
        </CardHeader>
        <CardBody>
            <Text>Username</Text>
            <Input value={usernameState} onChange={(e) => setUsernameState(e.target.value)} type='text'/>
            <Text>Password</Text>
            <Input value={passwordState} onChange={(e) => setPasswordState(e.target.value)} type='password'/>
        </CardBody>
        <CardFooter display="flex" justifyContent="center">
            <Button colorScheme='primary' onClick={handleSubmit}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginScreen
