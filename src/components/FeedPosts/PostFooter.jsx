import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";

const PostFooter = ({ username, isProfilePage }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(1000);
    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikes(likes--);
        }
        else {
            setLiked(true);
            setLikes(likes++);
        }
    }
    return (
        <Box mt={"auto"}>
            <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"auto"}>
                <Box
                    onClick={handleLike}
                    cursor={"pointer"}
                    fontSize={18}
                >
                    {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
                </Box>
                <Box
                    cursor={"pointer"}
                    fontSize={18}
                >
                    <CommentLogo />
                </Box>
            </Flex>
            <Text fontWeight={600} fontSize={"sm"}>
                {likes} likes
            </Text>
            {!isProfilePage && (
                <>
                    <Text cursor={"pointer"} fontSize={"sm"} fontWeight={700}>
                        {username}{" "}
                        <Text cursor={"default"} as={"span"} fontWeight={400}>
                            Feeling Good
                        </Text>
                    </Text>
                    <Text fontSize={"sm"} color={"gray"}>
                        View all 1,999 comments
                    </Text>
                </>
            )}
            <Flex
                alignItems={"center"}
                justifyContent={"space-between"}
                w={"full"}
                mb={10}
            >
                <InputGroup>
                    <Input
                        variant={"flushed"}
                        placeholder={"Add a comment..."}
                        fontSize={14}
                    />
                    <InputRightElement>
                        <Button
                            fontSize={14}
                            color={"blue.500"}
                            fontWeight={600}
                            cursor={"pointer"}
                            _hover={{
                                color: "white"
                            }}
                            bg={"tranparent"}
                        >Post</Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    )
}

export default PostFooter