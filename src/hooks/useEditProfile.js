import { useState } from 'react'
import useShowToast from './useShowToast'
import useAuthStore from '../store/authStore'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import useUserProfileStore from '../store/userProfileStore'

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const showToast = useShowToast()
    const currentUser = useAuthStore(state => state.user);
    const setCurrentUser = useAuthStore(state => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile)

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !currentUser) return;
        setIsUpdating(true);
        const storageRef = ref(storage, `profilePics/${currentUser.uid}`)
        const userDocRef = doc(db, "users", currentUser.uid);
        let url = "";
        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url")
                url = await getDownloadURL(ref(storage, `profilePics/${currentUser.uid}`))
            }
            const updatedUser = {
                ...currentUser,
                fullName: inputs.fullName || currentUser.fullName,
                username: inputs.username || currentUser.username,
                bio: inputs.bio,
                profilePicUrl: url || currentUser.profilePicUrl,
            }
            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem('user-info', JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile updated successfully", "success");
        }
        catch (er) {
            showToast("Error", er.message, "error");
        }
    }
    return { editProfile, isUpdating };
}

export default useEditProfile