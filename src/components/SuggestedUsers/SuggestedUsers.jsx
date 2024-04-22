import { Text, Flex, VStack, Box, Link } from '@chakra-ui/react'
import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'

const SuggestedUsers = () => {
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />
            <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
                    Suggested for you
                </Text>
                <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
                    See All
                </Text>
            </Flex>
            <SuggestedUser name="Pavan" followers={240} avatar='https://bit.ly/dan-abramov' />
            <SuggestedUser name="Sai" followers={592} avatar='https://bit.ly/ryan-florence' />
            <SuggestedUser name="Bindu" followers={1094} avatar='https://bit.ly/code-beast' />
            <Box
                fontSize={12}
                color={"gray.500"}
                mt={5}
            >
                © 2024 Built By{" "}
                <Link
                    href='https://www.linkedin.com/in/satya991/'
                    target='_blank'
                    color={"blue.500"}
                    fontSize={14}
                >
                    Rocky991
                </Link>
            </Box>
        </VStack>
    )
}

export default SuggestedUsers