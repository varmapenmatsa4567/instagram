import { collection, doc, getDoc, getDocs, query, where, updateDoc, addDoc } from "firebase/firestore";
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

export const getPosts = async () => {
    const posts = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        posts.push({data: doc.data(), id: doc.id});
    });
    return posts;
}

export const createPost = async (username, caption, url) => {
    
    const doc = addDoc(collection(db, "posts"), {
        username: username,
        caption: caption,
        url: url,
        date: new Date(),
    });
}