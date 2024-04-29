import { Box, Image, Skeleton } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
    const { userProfile, isLoading } = useGetUserProfileById(post.createdBy)
    if (isLoading || userProfile == null) return (
        <Skeleton w={"full"}>
            <Box h={"400px"}>contents wrapped</Box>
        </Skeleton>
    )
    return (
        <>
            <PostHeader post={post} creatorProfile={userProfile} />
            <Box my={2} borderRadius={4} overflow={"hidden"}>
                <Image src={post.imageUrl} alt={"FEED POST IMG"} />
            </Box>
            <PostFooter post={post} creatorProfile={userProfile} />
        </>
    );
};

export default FeedPost