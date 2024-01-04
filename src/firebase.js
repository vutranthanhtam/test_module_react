import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";




const firebaseConfig = {
    apiKey: "AIzaSyDh2a4-zKqaa14A8HeSxXWJtPG5T2FSh58",
    authDomain: "vite-b80b3.firebaseapp.com",
    projectId: "vite-b80b3",
    storageBucket: "vite-b80b3.appspot.com",
    messagingSenderId: "673407618904",
    appId: "1:673407618904:web:14157c43d5efd86c839f2d",
    measurementId: "G-QXHKQWWZL7"
  };

const app = initializeApp(firebaseConfig);



export const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth(app);
    return await signInWithPopup(auth, provider)    
}
export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    return await signInWithPopup(auth, provider)    
}

export async function uploadToFirebase(file, fallBackUrl = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg") {
    try {
        const storage = getStorage(app);
        const fileNameRef = ref(storage, `image_${Date.now() * Math.random()}.${file.name.split('.')[file.name.split('.').length - 1]}`);

        let result = await uploadBytes(fileNameRef, file);
        let url  = await getDownloadURL(result.ref)
        return url
    }catch(err) {
        return fallBackUrl
    }
}