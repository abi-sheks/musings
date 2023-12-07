import React from 'react'
import { Card, CardHeader, CardBody, Input, Heading, Text, CardFooter, Button, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { errorToast, successToast } from '../components/Toasts'

const RegisterScreen = () => {
  const [usernameState, setUsernameState] = useState("")  
  const [passwordState, setPasswordState] = useState("") 
  const [confirmPasswordState, setConfirmPasswordState] = useState("") 

  const navigate = useNavigate()
  const toast = useToast()
  
  
  const handleSubmit = async () => {
    try
    {
        if(!confirmPasswordState || !passwordState || !usernameState)
        {
            throw new Error("Please enter all your details")
        }
        if(confirmPasswordState !== passwordState)
        {
            throw new Error("Password not matching")
        }
        const response = (await axios.post("http://localhost:8000/api/auth/register/", JSON.stringify({username : usernameState, password : passwordState}), {headers : {"Content-type" : "application/json"}})).data
        console.log(response)
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", response.user.username)
        successToast(toast, response)
        navigate("/dashboard")
    }
    catch(error)
    {
      errorToast(toast, error)
    }

  }


  return (
    <div className='page'>
      <Card backgroundColor="secondary" height="100%" width="60%">
        <CardHeader>
            <Heading textAlign="center">Register</Heading>
        </CardHeader>
        <CardBody>
            <Text>Username</Text>
            <Input value={usernameState} onChange={(e) => setUsernameState(e.target.value)} type='text'/>
            <Text>Password</Text>
            <Input value={passwordState} onChange={(e) => setPasswordState(e.target.value)} type='password'/>
            <Text>Confirm Password</Text>
            <Input value={confirmPasswordState} onChange={(e) => setConfirmPasswordState(e.target.value)} type='password'/>
        </CardBody>
        <CardFooter display="flex" justifyContent="center">
            <Button colorScheme='primary' onClick={handleSubmit}>Register</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterScreen
