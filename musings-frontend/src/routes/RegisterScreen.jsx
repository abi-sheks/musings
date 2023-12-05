import React from 'react'
import { Card, CardHeader, CardBody, Input, Heading, Text, CardFooter, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'

const RegisterScreen = () => {
  const [usernameState, setUsernameState] = useState("")  
  const [passwordState, setPasswordState] = useState("") 
  const [confirmPasswordState, setConfirmPasswordState] = useState("") 

  const navigate = useNavigate()
  
  
  const handleSubmit = async () => {
    try
    {
        if(!confirmPasswordState || !passwordState || !usernameState)
        {
            console.log("enter all")
            return;
        }
        if(confirmPasswordState !== passwordState)
        {
            console.log("Enter properly")
            return;
        }
        const response = (await axios.post("http://localhost:8000/api/auth/register/", JSON.stringify({username : usernameState, password : passwordState}), {headers : {"Content-type" : "application/json"}})).data
        console.log(response)
        localStorage.setItem("token", response.token)
        localStorage.setItem("user", response.user.username)
        navigate("/dashboard")
    }
    catch(error)
    {
        console.log(error)
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
