import React, {useState} from 'react'
import {
    IconButton,
    useDisclosure, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text, 
    Input
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useCreateProject } from '../requests/project'


const CreateProjectModal = ({category}) => {
    const [titleState, setTitleState] = useState("")
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {projectCreating, projectCreator} = useCreateProject()

    const handleCreate = async () => {
        if(titleState === "")
        {
            console.log("enter title")
            return;
        }
        try
        {
            const result = await projectCreator({ title: titleState, categoryID : category.categoryID})
            console.log(result)
            onClose()
        }
        catch(error)
        {
            console.log(error)
        }

    }
    return (
        <div style={{marginTop : "1rem"}}>
            <IconButton colorScheme="primary" icon={<AddIcon />} onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent bg='secondary'>
                    <ModalHeader>Create a project in {category.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Give your project a name</Text>
                        <Input type='text' value={titleState} onChange={(e) => setTitleState(e.target.value)}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='primary' variant='solid' mr={3} onClick={handleCreate} isLoading={projectCreating}>
                            Create
                        </Button>
                        <Button colorScheme='primary' variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreateProjectModal
