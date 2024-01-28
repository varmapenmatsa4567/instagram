import { collection, doc, getDoc, getDocs, query, where, updateDoc, addDoc, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";
import { v4 } from "uuid";

export const uploadFile = async (file) => {
    // random filename
    const filename = v4();
    const storageRef = ref(storage, `posts/${filename+(file.name)}`);
    const uploadTask = await uploadBytes(storageRef, file);
    console.log(uploadTask);
    const url = await getDownloadURL(uploadTask.ref);
    console.log(url);
    return url;
}

export const uploadFiles = async (files) => {
    const urls = [];
    for(let i = 0; i < files.length; i++) {
        const url = await uploadFile(files[i]);
        urls.push(url);
    }
    return urls;

}

export const getPosts = async () => {
    const posts = [];
    const q = query(collection(db, "posts"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        posts.push({data: doc.data(), id: doc.id});
    });
    return posts;
}

export const addLike = async (postId, userId) => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        const data = docSnap.data();
        const likes = data.likes;
        likes.push(userId);
        await updateDoc(docRef, {
            likes: likes,
        });
        return likes;
    }
    else {
        console.log("No such document!");
        return null;
    }
}

export const disLike = async (postId, userId) => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        const data = docSnap.data();
        const likes = data.likes;
        const index = likes.indexOf(userId);
        if(index > -1) {
            likes.splice(index, 1);
        }
        await updateDoc(docRef, {
            likes: likes,
        });
        return likes;
    }
    else {
        console.log("No such document!");
        return null;
    }
}

export const addComment = async (postId, comment) => {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        const data = docSnap.data();
        const comments = data.comments;
        comments.push(comment);
        await updateDoc(docRef, {
            comments: comments,
        });
        return comments;
    }
    else {
        console.log("No such document!");
        return null;
    }
}

export const createPost = async (username, caption, urls) => {
    
    const doc = addDoc(collection(db, "posts"), {
        username: username,
        caption: caption,
        url: urls,
        likes: [],
        comments: [],
        date: new Date(),
    });
}