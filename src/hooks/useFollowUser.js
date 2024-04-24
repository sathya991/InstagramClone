import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore';
import useUserProfileStore from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const useFollowUser = (uid) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const { user, setUser } = useAuthStore();
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    const handleFollowUser = async () => {
        setIsUpdating(true);
        try {
            const currentUserRef = doc(db, "users", user.uid);
            const userToFollowOrUnfollowRef = doc(db, "users", uid);
            await updateDoc(currentUserRef, {
                following: isFollowing ? arrayRemove(uid) : arrayUnion(uid)
            })
            await updateDoc(userToFollowOrUnfollowRef, {
                followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
            })
            if (isFollowing) {
                setUser({
                    ...user,
                    following: user.following.filter(id => id !== uid)
                })
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(id => id !== user.uid)
                })
                localStorage.setItem('user-info', JSON.stringify({
                    ...user,
                    following: user.following.filter(id => id !== uid)
                }))
                setIsFollowing(false);
            } else {
                setUser({
                    ...user,
                    following: [...user.following, uid]
                })
                if (userProfile) {
                    setUserProfile({
                        ...userProfile,
                        followers: [...userProfile.followers, user.uid]
                    })
                }
                localStorage.setItem('user-info', JSON.stringify({
                    ...user,
                    following: [...user.following, uid]
                }))
                setIsFollowing(true);
            }
        } catch (er) {
            showToast("Error", er.message, "error");
        } finally {
            setIsUpdating(false);
        }
    }
    useEffect(() => {
        if (user) {
            const isFollowing = user.following.includes(uid)
            setIsFollowing(isFollowing);
        }

    }, [user, uid])
    return { isUpdating, isFollowing, handleFollowUser };
}

export default useFollowUser