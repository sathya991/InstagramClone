import { Alert, Flex, Image, Text, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import useGoogleLogin from '../../hooks/useGoogleLogin'

const GoogleAuth = ({ prefix }) => {
    const { loading, error, googleLogin } = useGoogleLogin();
    return (
        <>
            {error && (
                <Alert
                    status='error'
                    fontSize={12}
                    p={2}
                    borderRadius={4}
                >
                    <AlertIcon fontSize={12} />
                    {error.message}
                </Alert>
            )}
            <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={googleLogin}>
                <Image src='/google.png' w={5} alt='Google Logo' />
                <Text mx="2" color={"blue.500"}>
                    {prefix} with Google
                </Text>
            </Flex>
        </>

    )
}

export default GoogleAuth