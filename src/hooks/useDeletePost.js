import { useState } from 'react'
import useShowToast from './useShowToast';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';
import usePostStore from '../store/postStore';
import useUserProfileStore from '../store/userProfileStore';

const useDeletePost = () => {
    const showToast = useShowToast();
    const authUser = useAuthStore(state => state.user);
    const [isDeleting, setIsDeleting] = useState(false);
    const deletePost = usePostStore(state => state.deletePost);
    const deleteUserPost = useUserProfileStore(state => state.deletePost);
    const handleDeletePost = async (post) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            const imageRef = ref(storage, `posts/${post.id}`);
            await deleteObject(imageRef);
            const userRef = doc(db, "users", authUser.uid);
            await deleteDoc(doc(db, "posts", post.id));
            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            })
            deletePost(post.id);
            deleteUserPost(post.id);
            showToast("Success", "Post deleted successfully", "success")
        }
        catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsDeleting(false);
        }
    }
    return { isDeleting, handleDeletePost };
}

export default useDeletePost