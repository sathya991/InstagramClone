import React, { useEffect, useState } from 'react'
import usePostStore from '../store/postStore';
import useShowToast from './useShowToast';
import useUserProfileStore from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore(state => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) return;
            setIsLoading(true);
            setPosts([])
            try {
                const q = query(collection(db, "posts"), where("createdBy", "==", userProfile.uid))
                const querySnap = await getDocs(q);
                const posts = [];
                querySnap.forEach((doc) => {
                    posts.push({ ...doc.data(), id: doc.id });
                })
                posts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(posts);
            }
            catch (error) {
                showToast("Error", error.message, "error");
                setIsLoading(false);
            }
            finally {
                setIsLoading(false);
            }
        }
        getPosts();
    }, [setPosts, userProfile, showToast])
    return { isLoading, posts }
}

export default useGetUserPosts