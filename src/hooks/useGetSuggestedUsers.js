import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/authStore';
import useShowToast from './useShowToast';
import { collection, getDocs, limit, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { query } from 'firebase/database';

const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsersList, setSuggestedUsersList] = useState([])
    const authUser = useAuthStore(state => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getSuggestedUsers = async () => {
            setIsLoading(true);
            try {
                const userRef = collection(db, "users");
                const q = query(userRef, where("uid", "not-in", [authUser.uid, ...authUser.following]),
                    orderBy("uid"),
                    limit(3)
                )
                const querySnap = await getDocs(q);
                const users = [];
                querySnap.forEach(doc => {
                    users.push({ ...doc.data(), id: doc.id })
                })
                setSuggestedUsersList(users);
            }
            catch (error) {
                showToast("Error", error.message, "error")
            }
            finally {
                setIsLoading(false);
            }
        }
        if (authUser) getSuggestedUsers()

    }, [authUser, showToast])
    return { isLoading, suggestedUsersList }
}

export default useGetSuggestedUsers