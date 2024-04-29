import { useState } from "react"
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import usePostStore from "../store/postStore";

const usePostComment = () => {
    const [isCommenting, setIsCommenting] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore(state => state.user);
    const addComment = usePostStore(state => state.addComment);
    const handlePostComment = async (postId, comment) => {
        if (isCommenting) return;
        if (!authUser) return showToast("Error", "You must be logged in to comment", "error");
        setIsCommenting(true);
        const newComment = {
            comment: comment,
            createdAt: Date.now(),
            createdBy: authUser.uid,
            postId
        }
        try {
            await updateDoc(doc(db, "posts", postId), {
                comments: arrayUnion(newComment)
            })
            addComment(postId, newComment);

        } catch (er) {
            showToast("Error", er.message, "error");
        }
        finally {
            setIsCommenting(false);
        }
    }
    return { isCommenting, handlePostComment };
}

export default usePostComment