import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";
import { showAlert } from "../Toast";


export async function createUser(e: any, displayName: any, email: string, password: string, router: any) {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

        setDoc(doc(collection(db, 'accounts'), userCredential.user.uid), {
            uid: userCredential.user.uid,
            display_name: displayName,
            email: userCredential.user.email,
            timestamp: serverTimestamp(),
            image_url: '/img/defaultUser.jpg',
            biography: null,
            online: false,
        })

        updateProfile(auth.currentUser, { photoURL: '/img/defaultUser.jpg', displayName })

        router.push("/")

        showAlert("Successfully signed up!", "success")
    })
    .catch((error) => {
        console.log(error);
        showAlert(error, "error")
    });
}


export async function loginUser(e: any, email: string, password: string, router: any) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...

        router.push("/")

        showAlert("Giriş başarılı!", "success")
    })
    .catch((error) => {
        console.log(error);
        showAlert(error, "error")
    });
}


export async function signOutHandler() {
    signOut(auth).then(() => {
        showAlert("You've signed out.", "error")
    }).catch((error) => {
        console.log(error);
    });
}