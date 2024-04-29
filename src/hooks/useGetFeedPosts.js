import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore';
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetFeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore()
    const authUser = useAuthStore(state => state.user);
    const showToast = useShowToast()
    const { setUserProfile } = useUserProfileStore();
    useEffect(() => {
        const getFeedPosts = async () => {
            if (authUser.following.length === 0) {
                setIsLoading(false);
                setPosts([])
                return;
            }
            setIsLoading(true);
            const q = query(collection(db, "posts"), where("createdBy", "in", authUser.following))
            try {
                const querySnap = await getDocs(q);
                const feedPosts = [];
                querySnap.forEach((post) => {
                    feedPosts.push({ id: post.id, ...post.data() });
                })
                feedPosts.sort((a, b) => b.createdAt - a.createdAt)
                setPosts(feedPosts)
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        }
        if (authUser) getFeedPosts();
    }, [authUser, showToast, setPosts, setUserProfile])
    return { isLoading, posts };
}

export default useGetFeedPosts