import React, { useEffect, useState } from 'react'
import useShowToast from './useShowToast';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import useUserProfileStore from '../store/userProfileStore';
import useAuthStore from '../store/authStore';

const useGetUserProfile = (username) => {
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();
    const { userProfile, setUserProfile } = useUserProfileStore();
    const setUser = useAuthStore(state => state.setUser);
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const que = query(collection(db, "users"), where("username", "==", username));
                const querySnap = await getDocs(que);
                if (querySnap.empty) {
                    return setUserProfile(null);
                }
                let userDocument;
                querySnap.forEach((doc) => {
                    userDocument = doc.data();
                })
                setUserProfile(userDocument);
            }
            catch (er) {
                showToast("Error", er.message, "error");
            }
            finally {
                setIsLoading(false);
            }
        }
        getUserProfile()
    }, [setUserProfile, username, showToast]);
    return { isLoading, userProfile };
}

export default useGetUserProfile