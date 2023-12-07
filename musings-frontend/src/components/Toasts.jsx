export const errorToast = (toast, error) => {
    toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
}
export const successToast = (toast, success) => {
    toast({
        title: 'Success',
        description: success.message,
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
}