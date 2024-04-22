import { Avatar, Text, Flex, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'

const SuggestedHeader = () => {
    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Avatar name='Rocky991' size={"sm"} src='/img1.png' />
                <Text fontSize={12} fontWeight={"bold"}>
                    rocky991
                </Text>
            </Flex>
            <Link
                pb={2}
                as={RouterLink}
                to={"/auth"}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                cursor={"pointer"}
                style={{ textDecoration: "none" }}
            >
                Log out
            </Link>
        </Flex>
    )
}

export default SuggestedHeader